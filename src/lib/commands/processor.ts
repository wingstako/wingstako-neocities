import { displayStore } from '$lib/stores/terminal-store';
import { BocchiCommand } from './bocchi';
import { ClearCommand } from './clear';
import { handle } from './error-handler';
import { HelpCommand } from './help';
import { WingstakoCommand } from './wingstako';

export class CommandProcessor {
	private static instance: CommandProcessor;

	private helpCommand = new HelpCommand();

	private clearCommand = new ClearCommand();

	private wingstakoCommand = new WingstakoCommand();

	private bocchiCommand = new BocchiCommand();

	private constructor() {
		// private constructor for singleton
	}

	public static getIntance(): CommandProcessor {
		if (!CommandProcessor.instance) {
			CommandProcessor.instance = new CommandProcessor();
		}

		return CommandProcessor.instance;
	}

	public process(command: string) {
		const command_arr = command.split(' ', 2);

		console.log(command_arr);
		const prefix = command_arr[0];

		let args: string[] = [];
		if (command_arr.length > 1) {
			args = command_arr[1].split(' ');
		}

		switch (prefix) {
			case 'help':
				return this.helpCommand.execute(args);
			case 'clear':
				return this.clearCommand.execute(args);
			case 'wingstako':
				return this.wingstakoCommand.execute(args);
			case 'bocchi':
				return this.bocchiCommand.execute(args);
			default:
				displayStore.update((display) => display.concat(handle(command)));
				break;
		}
	}
}
