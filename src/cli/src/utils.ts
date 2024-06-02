import { ClientPeer, Fluence } from '@fluencelabs/js-client';
import relays from './relays.json' assert { type: 'json' };
import 'dotenv/config';
import CLI from 'clui';
import clc from 'cli-color';
import { Result, ResultAsync, err, errAsync, ok } from 'neverthrow';
import { Worker, WorkerClient, WorkerGroup } from 'fluence-secret-holder-client';
import { checkbox } from '@inquirer/prompts';
import { CommandModule, Options } from 'yargs';

export function getFluenceClient(): ResultAsync<ClientPeer, Error> {
  const keyString = process.env.PRIVATE_KEY;
  if (!keyString) {
    return errAsync(new Error('PRIVATE_KEY variable is not set'));
  }

  const key = Buffer.from(keyString, 'base64');
  return ResultAsync.fromPromise(
    Fluence.connect(relays[0], {
      keyPair: {
        type: 'Ed25519',
        source: key,
      },
    }),
    () => new Error('Failed to connect client'),
  ).map(() => Fluence.getClient());
}

export async function getWorkerGroup(
  workerClient: WorkerClient,
  dealId: string,
): Promise<Result<WorkerGroup, Error>> {
  const workers = await workerClient.resolveDeal({ id: dealId });
  if (workers.isErr()) {
    return err(new Error('Failed to get workers' + workers.error.message));
  }
  return await checkbox({
    message: 'Select workers',
    required: true,
    choices: Array.from(workers.value.values()).map((worker) => ({
      name: worker.workerId,
      value: worker.workerId,
      checked: true,
    })),
  }).then((answer) => {
    const filteredWorkers = answer.map((w) => {
      return workers.value.get(w);
    });

    const workerMap = new Map<string, Worker>();

    filteredWorkers.forEach((worker) => {
      if (worker === undefined) {
        throw new Error('Worker not found');
      }
      workerMap.set(worker.workerId, worker);
    });

    return ok(new WorkerGroup(workerMap, workerClient));
  });
}

export async function withFluenceClientCli(
  f: (client: ClientPeer) => Promise<Result<void, Error>>,
): Promise<void> {
  const connectToFluenceSpinner = new CLI.Spinner('Connecting to Fluence...');
  connectToFluenceSpinner.start();

  const client = await getFluenceClient();
  connectToFluenceSpinner.stop();
  if (client.isErr()) {
    new CLI.Line().column(client.error.message, 40, [clc.red]).output();
    return;
  }

  new CLI.Line().column('Connected to Fluence', 40, [clc.green]).output();

  const result = await f(client.value);
  await Fluence.disconnect();
  if (result.isErr()) {
    new CLI.Line().column(result.error.message, 40, [clc.red]).output();
  }
}

export type OptionsWithDefaultFunction<T> = Options & {
  defaultFunc?: () => ResultAsync<NonNullable<T>, Error>;
};

export function buildSecretHolderCommand<T>(
  command: string,
  description: string,
  options: { [key in keyof T]: OptionsWithDefaultFunction<T[key]> },
  handler: (client: ClientPeer, args: T) => Promise<Result<void, Error>>,
): CommandModule<object, T> {
  return {
    command: command,
    describe: description,
    builder: options,
    handler: async (argv) => {
      const result: T = {} as T;
      for (const key in options) {
        const defaultF = options[key].defaultFunc;
        if (defaultF !== undefined && argv[key] === undefined) {
          const defaultValue = await defaultF();
          if (defaultValue.isErr()) {
            new CLI.Line().column(defaultValue.error.message, 40, [clc.red]).output();
            return;
          }
          result[key] = defaultValue.value;
        } else {
          result[key] = argv[key] as T[Extract<keyof T, string>];
        }
      }

      await withFluenceClientCli((client) => handler(client, result));
    },
  };
}

type WithDealId = {
  dealId: string;
};

export function buildSecretHolderCommandWithWorkers<T extends WithDealId>(
  command: string,
  description: string,
  options: { [key in keyof T]: OptionsWithDefaultFunction<T[key]> },
  handler: (client: ClientPeer, args: T, workerClient: WorkerClient, workerGroup: WorkerGroup) => Promise<Result<void, Error>>,
): CommandModule<object, T> {
  return buildSecretHolderCommand(
    command,
    description,
    options,
    async (client, args) => {
      const workerClient = new WorkerClient(client);
      const workerGroup = await getWorkerGroup(workerClient, args.dealId);

      if (workerGroup.isErr()) {
        return err(new Error('Failed to get worker group' + workerGroup.error.message));
      }

      return handler(client, args, workerClient, workerGroup.value);
    },
  );
}
