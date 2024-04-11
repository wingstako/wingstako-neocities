import { DirectoryService } from '$lib/directory.service';
import { displayStore, directoryStore } from '$lib/stores/terminal-store';
import { createTerminalMessage } from '$lib/uitls';
import type { ICommand } from '../../types/command.interface';
import { get } from 'svelte/store';

export class CdCommand implements ICommand {
  execute(args: string[]): void {
    //if args is empty, then go to root directory
    if (args[0] === undefined || args[0] === '') {
      directoryStore.set([]);
      return;
    }

    const cdPath = args[0].split('/');

    // remove all empty string in cdPath
    for (let i = cdPath.length - 1; i >= 0; i--) {
      if (cdPath[i] === '') {
        cdPath.splice(i, 1);
      }
    }

    for (const path of cdPath) {
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
          return;
        }
        currentPath.push(path);
      }
      directoryStore.update(() => currentPath);
    }
  }
}
