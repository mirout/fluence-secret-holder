import { expect } from 'chai';
import { isContainsSecretInitFunc } from '../../src/secret-holder/utils.js';

describe('Test isContainsSecretUserFunc', () => {
  it('should return nothing if is empty', () => {
    expect(isContainsSecretInitFunc({ functions: [] })).to.be.false;
  });

  it('should return secret-user if contains secret-user', () => {
    expect(
      isContainsSecretInitFunc({
        functions: [
          {
            name: 'secret_initiate_handshake',
            arguments: [
              ['secret_id', 'string'],
              ['iteration', 'u8'],
              ['users_count', 'u8'],
            ],
            outputTypes: ['Error'],
          },
        ],
      }),
    ).to.be.true;
  });

  it('should return false if not contains any function for secret-user', () => {
    expect(
      isContainsSecretInitFunc({
        functions: [
          {
            name: 'not-secret-user',
            arguments: [
              ['secret_id', 'u8'],
              ['iteration', 'u8'],
              ['users_count', 'u8'],
            ],
            outputTypes: ['Error'],
          },
        ],
      }),
    ).to.be.false;
  });

  it('should return false if same types but different name', () => {
    expect(
      isContainsSecretInitFunc({
        functions: [
          {
            name: 'secret-user-1',
            arguments: [
              ['secret_id', 'string'],
              ['iteration', 'u8'],
              ['users_count', 'u8'],
            ],
            outputTypes: ['Error'],
          },
          {
            name: 'secret-user-2',
            arguments: [
              ['secret_id', 'string'],
              ['iteration', 'u8'],
              ['users_count', 'u8'],
            ],
            outputTypes: ['Error'],
          },
          {
            name: 'not-secret-user',
            arguments: [
              ['secret_id', 'string'],
              ['iteration', 'u8'],
              ['users_count', 'u8'],
            ],
            outputTypes: ['Error'],
          },
        ],
      }),
    ).to.be.false;
  });
});
