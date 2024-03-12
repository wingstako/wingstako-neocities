import { displayStore } from '$lib/stores/terminal-store';
import { createTerminalMessage } from '$lib/uitls';
import type { ICommand } from '../../types/command.interface';

export class EchoCommand implements ICommand {
  execute(args: string[]): void {
    const message = createTerminalMessage({
      message: args.join(' ') + '<br><br>',
      html: true
    });

    displayStore.update((display) => display.concat(message));
  }
}
