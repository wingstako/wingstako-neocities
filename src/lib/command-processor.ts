import { displayStore, interactiveCommandStore, runningCommandStore } from '$lib/stores/terminal-store';
import { handle } from './error-handler';
import { HelpCommand } from './commands/help';
import type { IAsyncCommand, ICommand, IInteractiveCommand } from './types/command.interface';
import { get } from 'svelte/store';
import { BocchiCommand, CatCommand, CdCommand, ClearCommand, CurlCommand, EchoCommand, LsCommand, PingCommand, WingstakoCommand } from './commands';

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

		const interactiveCommand = get(interactiveCommandStore)
		if (interactiveCommand != null && interactiveCommand != undefined) {
			interactiveCommand.update(input);
			return;
		}


		const [commandName, ...args] = input.split(' ');
		const command = COMMAND_REGISTRY[commandName.toLowerCase()];

		if (!command) {
			displayStore.update((display) => display.concat(handle(input)));
			return;
		}

		runningCommandStore.set(command);

		await command.execute(args);

		runningCommandStore.set(null);
	}
}
