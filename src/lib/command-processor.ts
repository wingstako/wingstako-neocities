import { displayStore, runningCommandStore } from '$lib/stores/terminal-store';
import { BocchiCommand } from './commands/bocchi';
import { ClearCommand } from './commands/clear';
import { handle } from './error-handler';
import { HelpCommand } from './commands/help';
import { WingstakoCommand } from './commands/wingstako';
import type { IAsyncCommand, ICommand, IInteractiveCommand } from './types/command.interface';
import { EchoCommand } from './commands/echo';
import { CdCommand } from './commands/cd';
import { CurlCommand } from './commands/curl';
import { LsCommand } from './commands/ls';
import { CatCommand } from './commands/cat';
import { get } from 'svelte/store';
import { PingCommand } from './commands/ping';


const COMMAND_REGISTRY: { [command: string]: ICommand | IAsyncCommand | IInteractiveCommand } = {
	'help': new HelpCommand(),
	'clear': new ClearCommand(),
	'wingstako': new WingstakoCommand(),
	'bocchi': new BocchiCommand(),
	'echo': new EchoCommand(),
	'cd': new CdCommand(),
	'curl': new CurlCommand(),
	'ls': new LsCommand(),
	'cat': new CatCommand(),
	'ping': new PingCommand(),
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

		const runningCommand = get(runningCommandStore)
		if (runningCommand != null && runningCommand != undefined) {
			runningCommand.update(input);
			return;
		}


		const [commandName, ...args] = input.split(' ');
		const command = COMMAND_REGISTRY[commandName.toLowerCase()];

		if (!command) {
			displayStore.update((display) => display.concat(handle(input)));
			return;
		}
		await command.execute(args);
	}
}
