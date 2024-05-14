import { DirectoryService } from '$lib/directory.service';
import { displayStore, directoryStore } from '$lib/stores/terminal-store';
import { createTerminalMessage } from '$lib/uitls';
import type { ICommand } from '../../types/command.interface';
import { get } from 'svelte/store';

export class LsCommand implements ICommand {
  execute(args: string[]): void {
    const showHidden = args.includes('-a');

    const currentDirectory = get(directoryStore).join('/');
    const directory = DirectoryService.getFoldersAndFiles(currentDirectory);
    if (directory === undefined) {
      return;
    }
    directory.sort((a, b) => a.name.localeCompare(b.name));

    const output = directory
      .filter((item) => showHidden || !item.isHidden)
      .map((item) =>
        item.type === 'directory'
          ? `<span style="color:lightblue">${item.name}/</span>`
          : `<span style="color:lightgreen">${item.name}</span>`,
      )
      .join('&nbsp;&nbsp;&nbsp;&nbsp;');

    const message = createTerminalMessage({
      message: output,
      html: true,
    });
    displayStore.update((display) => display.concat(message));
  }
}
