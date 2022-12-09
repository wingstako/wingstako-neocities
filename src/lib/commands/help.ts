import { displayStore } from '$lib/stores/terminal-store';
import type { ICommand } from './command';

export class HelpCommand implements ICommand {
	execute(args: string[]): void {
		const availableCommand = ['help', 'clear', 'wingstako', 'bocchi'];

		const messagee = {
			message: availableCommand.join(' | ')
		};

		displayStore.update((display) => display.concat(messagee));
	}
}
