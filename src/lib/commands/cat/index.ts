import { DirectoryService } from '$lib/directory.service';
import { displayStore } from '$lib/stores/terminal-store';
import { createTerminalMessage } from '$lib/uitls';
import type { IAsyncCommand } from '../../types/command.interface';

export class CatCommand implements IAsyncCommand {
  async execute(args: string[]): Promise<void> {
    // args[0] is the file name
    const fileNode = DirectoryService.getFile(args[0]);

    if (fileNode === null || fileNode === undefined) {
      const message = createTerminalMessage({
        message: `cat: ${args[0]}: No such file`,
      });
      displayStore.update((display) => display.concat(message));
      return;
    }

    const content = await fetch(fileNode.path.replace('static\\', '')).then((res) => res.text());

    const lines = content.split('\n');

    for (const line of lines) {
      const message = createTerminalMessage({
        message: line,
        html: false,
      });
      displayStore.update((display) => display.concat(message));
    }
  }
}
