import yargs from 'yargs';
import 'dotenv/config';
import { secretCommand } from './secret/secret.js';
import { initializerCommand } from './initializer.js';

await yargs(process.argv.slice(2))
  .wrap(yargs().terminalWidth())
  .command(initializerCommand)
  .command(secretCommand)
  .strictOptions()
  .scriptName('fluence-secret-holder-cli')
  .help()
  .parse();

process.exit(0);
