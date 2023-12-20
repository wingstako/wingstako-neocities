import { DirectoryService } from '$lib/directory.service';
import { displayStore, directoryStore } from '$lib/stores/terminal-store';
import { createTerminalMessage } from '$lib/uitls';
import type { ICommand } from '../types/command.interface';
import { get } from 'svelte/store';

export class CdCommand implements ICommand {
	execute(args: string[]): void {

        //if args is empty, then go to root directory
		if (args[0] === undefined || args[0] === '') {
			directoryStore.set([]);
			return;
		}

		const cdPath = args[0].split('/');

		console.log(cdPath)
		cdPath.forEach((path) => {
			const currentPath = get(directoryStore);
			if (path === '..') {
				currentPath.pop();
			} else {

				const folderNode = DirectoryService.getFolder(path);

				if (folderNode === null || folderNode === undefined) {
					const message = createTerminalMessage({
						message: `cd: ${args[0]}: No such directory`,
					});
					displayStore.update((display) => display.concat(message));
					throw new Error('No such directory');
				}

				currentPath.push(path);
				console.log(currentPath)
			}
			directoryStore.update(() => currentPath);
		});


		console.log(get(directoryStore));

        // directoryStore.update((directoryStore) => directoryStore.concat(args[0]));
	}
}
