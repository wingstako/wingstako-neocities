import { displayStore } from '$lib/stores/terminal-store';
import type { ICommand } from './command';

export class WingstakoCommand implements ICommand {
	execute(args: string[]): void {
		const message: TERMINAL.TerminalMessage = {
			message: `
            <pre>

                ██╗    ██╗██╗███╗   ██╗ ██████╗ ███████╗████████╗ █████╗ ██╗  ██╗ ██████╗
                ██║    ██║██║████╗  ██║██╔════╝ ██╔════╝╚══██╔══╝██╔══██╗██║ ██╔╝██╔═══██╗
                ██║ █╗ ██║██║██╔██╗ ██║██║  ███╗███████╗   ██║   ███████║█████╔╝ ██║   ██║
                ██║███╗██║██║██║╚██╗██║██║   ██║╚════██║   ██║   ██╔══██║██╔═██╗ ██║   ██║
                ╚███╔███╔╝██║██║ ╚████║╚██████╔╝███████║   ██║   ██║  ██║██║  ██╗╚██████╔╝
                 ╚══╝╚══╝ ╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝
        
            </pre>

            `,
			html: true,
			color: '#FFFFFF'
		};

		displayStore.update((display) => display.concat(message));
	}
}
