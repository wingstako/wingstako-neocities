import { DirectoryService } from '$lib/directory.service';
import { displayStore } from '$lib/stores/terminal-store';
import { createTerminalMessage } from '$lib/uitls';
import type { ICommand } from '../types/command.interface';

export class CatCommand implements ICommand {
	execute(args: string[]): void {
        
        // args[0] is the file name
        const fileNode = DirectoryService.getFile(args[0]);

        if (fileNode === null || fileNode === undefined) {
            const message = createTerminalMessage({
                message: `cat: ${args[0]}: No such file`,
            });
            displayStore.update((display) => display.concat(message));
            return;
        }

        const message = createTerminalMessage({
            message: fileNode.file.content!,
            html: true,
        });

		displayStore.update((display) => display.concat(message));
	}
}
