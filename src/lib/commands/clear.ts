import { displayStore } from '$lib/stores/terminal-store';
import type { ICommand } from './command';

export class ClearCommand implements ICommand {
	execute(args: string[]): void {
		displayStore.set([]);
	}
}
