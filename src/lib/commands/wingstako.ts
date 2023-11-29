import { displayStore } from '$lib/stores/terminal-store';
import { createTerminalMessage } from '$lib/uitls';
import type { ICommand } from './command';

export class WingstakoCommand implements ICommand {
    execute(args: string[]): void {
        const message: TERMINAL.TerminalMessage = createTerminalMessage({
            message: `
            <pre>

██╗    ██╗██╗███╗   ██╗ ██████╗ ███████╗████████╗ █████╗ ██╗  ██╗ ██████╗
██║    ██║██║████╗  ██║██╔════╝ ██╔════╝╚══██╔══╝██╔══██╗██║ ██╔╝██╔═══██╗
██║ █╗ ██║██║██╔██╗ ██║██║  ███╗███████╗   ██║   ███████║█████╔╝ ██║   ██║
██║███╗██║██║██║╚██╗██║██║   ██║╚════██║   ██║   ██╔══██║██╔═██╗ ██║   ██║
╚███╔███╔╝██║██║ ╚████║╚██████╔╝███████║   ██║   ██║  ██║██║  ██╗╚██████╔╝
 ╚══╝╚══╝ ╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝

This site is still under construction. I am thinking of a way to deal with interactive command.
<a style="background: linear-gradient(217deg, #e66465, rgba(255, 0, 0, 0) 70.71%)" href="https://github.com/wingstako/wingstako-neocities" target="blank">      
GitHub Repository: https://github.com/wingstsako/wingstako-neocities</a>
            </pre>
            `,
            html: true,
            color: '#FFFFFF',
        });

        displayStore.update((display) => display.concat(message));
    }
}
