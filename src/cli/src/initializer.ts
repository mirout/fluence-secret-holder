import 'dotenv/config';
import CLI from 'clui';
import clc from 'cli-color';
import { SecretHolderClient, WorkerClient } from 'fluence-secret-holder-client';
import { buildSecretHolderCommand, getWorkerGroup } from './utils.js';
import { DEAL_ID } from './options.js';
import { err, ok } from 'neverthrow';

export const initializerCommand = buildSecretHolderCommand(
  'initialize-service',
  'Initialize secret holder service',
  { ...DEAL_ID },
  async (client, args) => {
    const workerClient = new WorkerClient(client);
    const workerGroup = await getWorkerGroup(workerClient, args.dealId);

    if (workerGroup.isErr()) {
      return err(new Error('Failed to get worker group' + workerGroup.error.message));
    }

    const initializingHolderSpinner = new CLI.Spinner('Initializing secret holder service...');

    const secretClient = SecretHolderClient.deploy(client);

    const initializeResult = await secretClient.initializeSecretHolder(
      Array.from(workerGroup.value.workers.values()),
    );

    initializingHolderSpinner.stop();

    if (initializeResult.isErr()) {
      return err(new Error(initializeResult.error.message));
    }

    new CLI.Line().column('Secret holder service initialized', 40, [clc.green]).output();

    return ok(undefined);
  },
);
