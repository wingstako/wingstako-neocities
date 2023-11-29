import { displayStore } from '$lib/stores/terminal-store';
import { createTerminalMessage } from '$lib/uitls';
import type { ICommand } from './command';

export class HelpCommand implements ICommand {
	execute(args: string[]): void {
		const availableCommand = ['help', 'clear', 'wingstako'];

		const message = createTerminalMessage({
			message: availableCommand.join(' | ')
		});

		displayStore.update((display) => display.concat(message));
	}
}
