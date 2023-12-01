import { displayStore } from '$lib/stores/terminal-store';
import { BocchiCommand } from './commands/bocchi';
import { ClearCommand } from './commands/clear';
import { handle } from './error-handler';
import { HelpCommand } from './commands/help';
import { WingstakoCommand } from './commands/wingstako';
import type { ICommand } from './types/command.interface';
import { EchoCommand } from './commands/echo';
import { CdCommand } from './commands/cd';
import { CurlCommand } from './commands/curl';


const COMMAND_REGISTRY: {[command: string]: ICommand} = {
	'help': new HelpCommand(),
	'clear': new ClearCommand(),
	'wingstako': new WingstakoCommand(),
	'bocchi': new BocchiCommand(),
	'echo': new EchoCommand(),
	'cd': new CdCommand(),
	'curl': new CurlCommand(),
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

	public process(input: string) {
		const [commandName, ...args] = input.split(' ');
		const command = COMMAND_REGISTRY[commandName.toLowerCase()];
		
		if (!command) {
			displayStore.update((display) => display.concat(handle(input)));
			return;
		}
		command.execute(args);
	}
}
