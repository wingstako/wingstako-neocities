import { displayStore } from '$lib/stores/terminal-store';
import { createTerminalMessage } from '$lib/uitls';
import type { ICommand } from '../types/command.interface';

export class CurlCommand implements ICommand {
	execute(args: string[]): void {

        // transform blob into ascii arts
        // https://www.npmjs.com/package/ascii-art
        // https://www.npmjs.com/package/ascii-art-image
        // https://www.npmjs.com/package/ascii-art-to-image


        if (args[0].endsWith('.png') || args[0].endsWith('.jpg')) {
            const message = createTerminalMessage({
                message: `<img src="${args[0]}" alt="${args[0]}">`,
                html: true,
            });
            displayStore.update((display) => display.concat(message));
            return;
        }


        // use fetch to mimic curl
        fetch(args[0]).then((response) => {
            return response.text();
        }).then((text) => {
            const message = createTerminalMessage({
                message: text,
                html: true,
            });
            displayStore.update((display) => display.concat(message));
        }
        ).catch((error) => {
            const message = createTerminalMessage({
                message: error,
                html: true,
            });
            displayStore.update((display) => display.concat(message));
        });

		// const message = createTerminalMessage({
		// 	message: args.join(' '),
		// });

		// displayStore.update((display) => display.concat(message));
	}
}
