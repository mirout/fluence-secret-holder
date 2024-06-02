import { FuncSignatures } from '../worker/types.js';

export const isContainsSecretInitFunc = (signatures: FuncSignatures): boolean => {
  return (
    signatures.functions.find((func) => {
      return (
        func.name === 'secret_initiate_handshake' &&
        func.outputTypes.length === 1 &&
        func.outputTypes[0] === 'Error' &&
        func.arguments.length === 3 &&
        func.arguments[0][1] === 'string' &&
        func.arguments[1][1] === 'u8' &&
        func.arguments[2][1] === 'u8'
      );
    }) !== undefined
  );
};
