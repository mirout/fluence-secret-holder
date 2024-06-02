import { createClient } from '@fluencelabs/js-client';
import relays from './relays.json' assert { type: 'json' };
import { getBalance, getLastBlock } from './compiled-aqua/main.ts';
import 'dotenv/config';

const privateKey = process.env.PRIVATE_KEY_BASE64;
if (privateKey === undefined) {
  throw new Error('PRIVATE_KEY is not set');
}

const secretId = process.env.SECRET_ID;
if (secretId === undefined) {
  throw new Error('SECRET_ID is not set');
}

const key = Buffer.from(privateKey, 'base64');

const client = await createClient(relays[0], {
  keyPair: {
    type: 'Ed25519',
    source: key,
  },
});

try {
  const response = await getLastBlock(client, secretId);
  if (!response[1][0].is_ok || !response[0][0].is_ok) {
    throw new Error('Failed to get last block');
  }
  console.log(response[0][0].response);

  const balance = await getBalance(client, secretId, "0xBd971E29547e3ca12bA7Cec4eea2A96aEe3E9fAc");
  if (!balance[1][0].is_ok || !balance[0][0].is_ok) {
    throw new Error('Failed to get balance');
  }
  console.log(balance[0][0].response);
} catch (e) {
  console.error(e);
} finally {
  await client.disconnect();
}
