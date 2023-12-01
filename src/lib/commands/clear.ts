import { displayStore } from '$lib/stores/terminal-store';
import type { ICommand } from '../types/command.interface';

export class ClearCommand implements ICommand {
	execute(): void {
		displayStore.set([]);
	}
}
