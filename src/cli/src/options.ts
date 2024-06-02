import { PositionalOptionsType } from 'yargs';
import { OptionsWithDefaultFunction } from './utils.js';
import { ResultAsync, okAsync } from 'neverthrow';
import { password, select } from '@inquirer/prompts';

export const SECRET_ID = {
  secretId: {
    type: 'string' as PositionalOptionsType,
    describe: 'Secret id',
    demandOption: true,
  } as OptionsWithDefaultFunction<string>,
};

export const USER_ID = {
  userId: {
    string: true,
    describe: 'User id',
    type: 'string' as PositionalOptionsType,
    demandOption: true,
  } as OptionsWithDefaultFunction<string>,
};

export const DEAL_ID = {
  dealId: {
    string: true,
    describe: 'Deal id if not provided, use DEAL_ID env variable',
    type: 'string' as PositionalOptionsType,
    defaultFunc: () => okAsync(process.env.DEAL_ID),
  } as OptionsWithDefaultFunction<string>,
};

export const OWNABLE_SECRETS = {
  onlyOwnable: {
    type: 'boolean' as PositionalOptionsType,
    describe: 'Should list only ownable secrets',
    default: false,
  } as OptionsWithDefaultFunction<boolean>,
} 

export const SECRET_VALUE = {
  secret: {
    type: 'string' as PositionalOptionsType,
    describe: 'Secret value',
    string: true,
    defaultFunc: () =>
      ResultAsync.fromPromise(
        password({ message: 'Enter secret' }),
        () => new Error('Failed to get secret'),
      ),
  } as OptionsWithDefaultFunction<string>,
};

export const ROLE = {
  role: {
    type: 'string' as PositionalOptionsType,
    describe: 'Role',
    string: true,
    defaultFunc: () =>
      ResultAsync.fromPromise(
        select({
          message: 'Select role',
          choices: [{value: 'owner'}, {value: 'user'}],
        }),
        () => new Error('Failed to get role'),
      ),
}
};