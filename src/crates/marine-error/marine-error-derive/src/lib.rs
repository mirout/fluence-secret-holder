use proc_macro::TokenStream;
use proc_macro2::Literal;
use quote::{quote, ToTokens};
use syn::{parse_macro_input, parse_str, DeriveInput};

#[proc_macro_derive(MarineResult, attributes(marine_wrapper_suffix))]
pub fn marine_result_derive(input: TokenStream) -> TokenStream {
    let DeriveInput { ident, attrs, .. } = parse_macro_input!(input as DeriveInput);

    let suffix_attr = attrs
        .iter()
        .find(|a| a.meta.path().is_ident("marine_wrapper_suffix"))
        .map(|a| {
            let meta = a.parse_args::<Literal>().unwrap();
            meta.to_string().trim_matches('"').to_string()
        })
        .unwrap_or("Result".to_string());

    let original_struct_name = ident;
    let new_struct_name = syn::Ident::new(
        &format!("{}{}", original_struct_name, suffix_attr),
        original_struct_name.span(),
    );

    let ans = quote! {
        #[marine]
        pub struct #new_struct_name  {
            pub value: #original_struct_name,
            pub error: ::marine_error::Error,
        }

        impl #new_struct_name {
            pub fn ok(value: #original_struct_name) -> Self {
                Self {
                    value,
                    error: ::marine_error::Error::default(),
                }
            }

            pub fn error(message: String) -> Self {
                Self {
                    value: Default::default(),
                    error: ::marine_error::Error::new(message),
                }
            }
        }

        impl From<#original_struct_name> for #new_struct_name {
            fn from(value: #original_struct_name) -> Self {
                Self::ok(value)
            }
        }

        impl <E: ::std::error::Error> From<Result<#original_struct_name, E>> for #new_struct_name {
            fn from(result: Result<#original_struct_name, E>) -> Self {
                match result {
                    Ok(value) => Self::ok(value),
                    Err(error) => Self::error(error.to_string()),
                }
            }
        }

        impl From<#new_struct_name> for Result<#original_struct_name, ::marine_error::Error> {
            fn from(result: #new_struct_name) -> Self {
                if result.error.is_ok {
                    Ok(result.value)
                } else {
                    Err(result.error)
                }
            }
        }
    };

    ans.into()
}

enum ResultType {
    Error,
    Struct(syn::Ident),
}

impl ResultType {
    fn rename(self, ident_fn: impl FnOnce(syn::Ident) -> syn::Ident) -> Self {
        match self {
            ResultType::Error => ResultType::Error,
            ResultType::Struct(s) => ResultType::Struct(ident_fn(s)),
        }
    }
}

impl ToTokens for ResultType {
    fn to_tokens(&self, tokens: &mut proc_macro2::TokenStream) {
        match self {
            ResultType::Error => tokens.extend(quote! { ::marine_error::Error }),
            ResultType::Struct(s) => s.to_tokens(tokens),
        }
    }
}

#[proc_macro_attribute]
pub fn wrap_marine_result(attr: TokenStream, item: TokenStream) -> TokenStream {
    let input = parse_macro_input!(item as syn::ItemFn);

    let ident = input.sig.ident.clone();
    let args = input.sig.inputs.clone();
    let function_name = match attr.into_iter().next() {
        Some(proc_macro::TokenTree::Literal(i)) => {
            let s = i.to_string();
            let s = s.trim_matches('"');
            parse_str::<syn::Ident>(s).unwrap()
        }
        _ => panic!("Expected function name"),
    };

    let original_return_type = input.sig.output.clone();
    let original_return_type = match original_return_type {
        syn::ReturnType::Type(_, ty) => *ty,
        _ => panic!("Only functions with return type are supported"),
    };

    let original_return_type = match original_return_type {
        syn::Type::Path(p) => p,
        _ => panic!("Only functions with return type are supported"),
    };
    let original_return_type = original_return_type.path.segments.last().unwrap();

    let result_types = match &original_return_type.arguments {
        syn::PathArguments::AngleBracketed(a) => a
            .args
            .iter()
            .filter_map(|a| match a {
                syn::GenericArgument::Type(t) => Some(t),
                _ => None,
            })
            .collect::<Vec<_>>(),
        _ => panic!("Only functions returning Result are supported"),
    };

    let original_struct_name = match &result_types[0] {
        syn::Type::Path(p) => ResultType::Struct(p.path.segments.last().unwrap().ident.clone()),
        syn::Type::Tuple(t) if t.elems.is_empty() => ResultType::Error,
        _ => panic!("Only functions returning struct or unit are supported"),
    };

    let new_struct_name =
        original_struct_name.rename(|s| syn::Ident::new(&format!("{}Result", s), s.span()));

    let args_name = args
        .iter()
        .map(|a| match a {
            syn::FnArg::Typed(t) => t.pat.clone(),
            _ => panic!("Only functions with arguments are supported"),
        })
        .collect::<Vec<_>>();

    let ans = quote! {
        #[marine]
        pub fn #function_name(#args) -> #new_struct_name {
            let result = #ident(#(#args_name), *);
            result.into()
        }

        #input
    };

    ans.into()
}
