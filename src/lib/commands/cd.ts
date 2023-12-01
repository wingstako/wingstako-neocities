import { displayStore, directoryStore } from '$lib/stores/terminal-store';
import { createTerminalMessage } from '$lib/uitls';
import type { ICommand } from '../types/command.interface';

export class CdCommand implements ICommand {
	execute(args: string[]): void {
		
		//remove all the empty string in args
		args = args.filter((arg) => arg !== '');
		
        //if args is empty, then go to root directory
		if (args.length === 0) {
			directoryStore.set([]);
			return;
		}

        directoryStore.update((directoryStore) => directoryStore.concat(args[0]));
	}
}
