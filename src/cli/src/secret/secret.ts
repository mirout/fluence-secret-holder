import { Argv, CommandModule } from 'yargs';
import CLI from 'clui';
import { buildSecretHolderCommandWithWorkers } from '../utils.js';
import { SecretHolderClient } from 'fluence-secret-holder-client';
import { Result, err, ok } from 'neverthrow';
import { DEAL_ID, OWNABLE_SECRETS, ROLE, SECRET_ID, SECRET_VALUE, USER_ID } from '../options.js';
import { checkbox } from '@inquirer/prompts';

export const secretCommand: CommandModule = {
  builder: (yargs: Argv) => {
    return yargs
      .command(getSecretCommand)
      .command(saveSecretCommand)
      .command(getMySecretsCommand)
      .command(getSecretMetadataCommand)
      .command(initializeSecret)
      .command(getRole)
      .command(permitRole)
      .command(revokeRole);

  },
  command: 'secret',
  describe: 'Secret commands',
  handler: () => {
    console.log('Secret command');
  },
};

const getSecretCommand: CommandModule<object, { dealId: string; secretId: string }> =
  buildSecretHolderCommandWithWorkers(
    'get',
    'Get secret',
    {
      ...DEAL_ID,
      ...SECRET_ID,
    },
    async (client, args, _, workerGroup) => {
      const gettingSecretSpinner = new CLI.Spinner('Getting secret...');
      gettingSecretSpinner.start();

      const localSecret = SecretHolderClient.deploy(client).getSecretFromHolder(
        { id: args.secretId },
        workerGroup,
      );

      const secret = await localSecret.verifySecret();
      if (secret.isErr()) {
        gettingSecretSpinner.stop();
        return err(new Error('Failed to verify secret' + secret.error.message));
      }

      const secretValue = await secret.value.getSecret();
      gettingSecretSpinner.stop();

      if (secretValue.isErr()) {
        return err(new Error('Failed to get secret' + secretValue.error.message));
      }

      secretValue.value.forEach((value, workerId) => {
        console.log('Secret for worker:', workerId, 'value:', new TextDecoder().decode(value));
      });

      return ok(undefined);
    },
  );

const saveSecretCommand: CommandModule<object, { dealId: string; secret: string }> =
  buildSecretHolderCommandWithWorkers(
    'save',
    'Save secret',
    {
      ...SECRET_VALUE,
      ...DEAL_ID,
    },
    async (client, args, _, workerGroup) => {
      const savingSecretSpinner = new CLI.Spinner('Saving secret...');
      savingSecretSpinner.start();

      const localSecret = SecretHolderClient.deploy(client).createNewSecret(workerGroup);
      localSecret.setSecret(new TextEncoder().encode(args.secret));

      const savedSecretResult = await localSecret.sendSecret();
      savingSecretSpinner.stop();

      if (savedSecretResult.isErr()) {
        return err(new Error('Failed to save secret' + savedSecretResult.error.message));
      }

      console.log('Secret saved, secret id:', savedSecretResult.value.secretId.id);
      return ok(undefined);
    },
  );

const getMySecretsCommand: CommandModule<object, { dealId: string, onlyOwnable: boolean }> = buildSecretHolderCommandWithWorkers(
  'list',
  'List secrets',
  {
    ...DEAL_ID,
    ...OWNABLE_SECRETS,
  },
  async (client, args, _, workerGroup) => {
    const gettingSecretSpinner = new CLI.Spinner('Getting secrets...');
    gettingSecretSpinner.start();

    let secretIds: Result<Map<string, {secretId: {id: string}}[]>, {message: string}>;
    if (args.onlyOwnable) {
      secretIds = await SecretHolderClient.deploy(client).getOwnableSecrets(
        Array.from(workerGroup.workers.values()),
      );
    } else {
      secretIds = await SecretHolderClient.deploy(client).getAvailableForUseSecrets(
        Array.from(workerGroup.workers.values()),
      );
    }

    gettingSecretSpinner.stop();
    if (secretIds.isErr()) {
      return err(new Error('Failed to get secrets' + secretIds.error.message));
    }

    secretIds.value.forEach((secretIds, workerId) => {
      console.log(
        'Secrets for worker:',
        workerId,
        'ids:',
        secretIds.map((id) => id.secretId.id),
      );
    });

    return ok(undefined);
  },
);

const getSecretMetadataCommand: CommandModule<object, { dealId: string; secretId: string }> =
  buildSecretHolderCommandWithWorkers(
    'metadata',
    'Get secret metadata',
    {
      ...DEAL_ID,
      ...SECRET_ID,
    },
    async (client, args, _, workerGroup) => {
      const gettingSecretSpinner = new CLI.Spinner('Getting secret metadata...');
      gettingSecretSpinner.start();

      const metadata = await SecretHolderClient.deploy(client).getSecretMetadata(
        { id: args.secretId },
        Array.from(workerGroup.workers.values()),
      );

      gettingSecretSpinner.stop();
      if (metadata.isErr()) {
        return err(new Error('Failed to get secret metadata' + metadata.error.message));
      }

      metadata.value.forEach((metadata, workerId) => {
        console.log('Secret metadata for worker:', workerId, 'metadata:', metadata);
      });

      return ok(undefined);
    },
  );

const initializeSecret: CommandModule<object, { dealId: string, secretId: string }> = 
  buildSecretHolderCommandWithWorkers(
    'initialize',
    'Initialize secret',
    {
      ...DEAL_ID,
      ...SECRET_ID,
    },
    async (client, args, _, workerGroup) => {
      const getAvailableServicesSpinner = new CLI.Spinner('Getting available services...');
      getAvailableServicesSpinner.start();

      var secretHolderClient = SecretHolderClient.deploy(client);
      const secret = await secretHolderClient.getSecretFromHolder({id: args.secretId}, workerGroup).verifySecret();
      if (secret.isErr()) {
        getAvailableServicesSpinner.stop();
        return err(new Error('Failed to verify secret' + secret.error.message));
      }

      const services = await secret.value.getAvailableUserServices();
      getAvailableServicesSpinner.stop();

      if (services.isErr()) {
        return err(new Error('Failed to get available services' + services.error.message));
      }

      console.log('Available services:', services.value);
      const selectedServices = await checkbox({
        message: 'Select services',
        required: true,
        choices: services.value.map((service) => ({
          name: service,
          value: service,
          checked: true,
        })),
      });

      const initializeSecretSpinner = new CLI.Spinner('Initializing secret...');
      initializeSecretSpinner.start();

      const result = await secret.value.initializeSecret(selectedServices);
      initializeSecretSpinner.stop();
      if (result.isErr()) {
        return err(new Error('Failed to initialize secret' + result.error.message));
      }

      return ok(undefined);
    },
  );

const getRole: CommandModule<object, { dealId: string, userId: string, secretId: string }> =
  buildSecretHolderCommandWithWorkers(
    'role',
    'Get role',
    {
      ...DEAL_ID,
      ...SECRET_ID,
      ...USER_ID,
    },
    async (client, args, _, workerGroup) => {
      const gettingRoleSpinner = new CLI.Spinner('Getting role...');
      gettingRoleSpinner.start();

      const secret = await SecretHolderClient.deploy(client).getSecretFromHolder(
        { id: args.secretId },
        workerGroup,
      ).verifySecret();
      if (secret.isErr()) {
        gettingRoleSpinner.stop();
        return err(new Error('Failed to verify secret' + secret.error.message));
      }

      const role = await secret.value.getUserRole({ id: args.userId });
      gettingRoleSpinner.stop();

      if (role.isErr()) {
        return err(new Error('Failed to get role' + role.error.message));
      }

      role.value.forEach((role, workerId) => {
        console.log('Role for worker:', workerId, 'role:', role);
      });

      return ok(undefined);
    },
  );

const permitRole: CommandModule<object, { dealId: string, userId: string, secretId: string, role: string }> =
  buildSecretHolderCommandWithWorkers(
    'permit',
    'Permit role',
    {
      ...DEAL_ID,
      ...SECRET_ID,
      ...USER_ID,
      ...ROLE,
    },
    async (client, args, _, workerGroup) => {
      const permitRoleSpinner = new CLI.Spinner('Permitting role...');
      permitRoleSpinner.start();

      const result = await SecretHolderClient.deploy(client).getSecretFromHolder(
        { id: args.secretId },
        workerGroup,
      ).verifySecret().andThen((secret) => secret.permitRole({ id: args.userId }, args.role));
      permitRoleSpinner.stop();

      if (result.isErr()) {
        return err(new Error('Failed to permit role' + result.error.message));
      }

      return ok(undefined);
    },
  );

const revokeRole: CommandModule<object, { dealId: string, userId: string, secretId: string }> =
  buildSecretHolderCommandWithWorkers(
    'revoke',
    'Revoke role',
    {
      ...DEAL_ID,
      ...SECRET_ID,
      ...USER_ID,
    },
    async (client, args, _, workerGroup) => {
      const revokeRoleSpinner = new CLI.Spinner('Revoking role...');
      revokeRoleSpinner.start();

      const result = await SecretHolderClient.deploy(client).getSecretFromHolder(
        { id: args.secretId },
        workerGroup,
      ).verifySecret().andThen((secret) => secret.revokeRole({ id: args.userId }));
      revokeRoleSpinner.stop();

      if (result.isErr()) {
        return err(new Error('Failed to revoke role' + result.error.message));
      }

      return ok(undefined);
    },
  );
  