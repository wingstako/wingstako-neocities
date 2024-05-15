import {
  displayStore,
  interactiveCommandStore,
  runningCommandStore,
} from '$lib/stores/terminal-store';
import { handleUnexpectedError, handleUnknownCommand } from './error-handler';
import type { IAsyncCommand, ICommand, IInteractiveCommand } from './types/command.interface';
import { get } from 'svelte/store';
import {
  BocchiCommand,
  CatCommand,
  CdCommand,
  ClearCommand,
  CurlCommand,
  EchoCommand,
  HeadCommand,
  HelpCommand,
  LsCommand,
  PingCommand,
  PwdCommand,
  TailCommand,
  TakoCommand,
  WingstakoCommand,
} from './commands';

const COMMAND_REGISTRY: { [command: string]: ICommand | IAsyncCommand | IInteractiveCommand } = {
  help: new HelpCommand(),
  clear: new ClearCommand(),
  wingstako: new WingstakoCommand(),
  bocchi: new BocchiCommand(),
  echo: new EchoCommand(),
  cd: new CdCommand(),
  curl: new CurlCommand(),
  ls: new LsCommand(),
  cat: new CatCommand(),
  ping: new PingCommand(),
  pwd: new PwdCommand(),
  head: new HeadCommand(),
  tail: new TailCommand(),
  tako: new TakoCommand(),
};

export class CommandProcessor {
  private static instance: CommandProcessor;

  private constructor() {
    // private constructor for singleton
  }

  public static getInstance(): CommandProcessor {
    if (!CommandProcessor.instance) {
      CommandProcessor.instance = new CommandProcessor();
    }

    return CommandProcessor.instance;
  }

  public async process(input: string) {
    try {
      const interactiveCommand = get(interactiveCommandStore);
      if (interactiveCommand != null && interactiveCommand != undefined) {
        interactiveCommand.update(input);
        return;
      }

      const [commandName, ...args] = input.split(' ');
      const command = COMMAND_REGISTRY[commandName.toLowerCase()];

      if (!command) {
        displayStore.update((display) => display.concat(handleUnknownCommand(input)));
        return;
      }

      runningCommandStore.set(command);

      await command.execute(args);
    } catch (error) {
      displayStore.update((display) => display.concat(handleUnexpectedError(error as Error)));
    } finally {
      runningCommandStore.set(null);
    }
  }
}
