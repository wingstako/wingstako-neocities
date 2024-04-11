import { displayStore, directoryStore } from '$lib/stores/terminal-store';
import { createTerminalMessage } from '$lib/uitls';
import type { ICommand } from '../../types/command.interface';
import { get } from 'svelte/store';

export class PwdCommand implements ICommand {
  execute(): void {
    const currentPath = get(directoryStore);
    const message = createTerminalMessage({
      message: currentPath.join('/')
    });
    displayStore.update((display) => display.concat(message));
  }
}
