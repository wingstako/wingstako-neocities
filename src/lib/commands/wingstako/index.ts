import { displayStore } from '$lib/stores/terminal-store';
import { createTerminalMessage } from '$lib/uitls';
import type { ICommand } from '../../types/command.interface';

export class WingstakoCommand implements ICommand {
  execute(): void {
    const message: TERMINAL.TerminalMessage = createTerminalMessage({
      message: `
            <pre>

██╗    ██╗██╗███╗   ██╗ ██████╗ ███████╗████████╗ █████╗ ██╗  ██╗ ██████╗
██║    ██║██║████╗  ██║██╔════╝ ██╔════╝╚══██╔══╝██╔══██╗██║ ██╔╝██╔═══██╗
██║ █╗ ██║██║██╔██╗ ██║██║  ███╗███████╗   ██║   ███████║█████╔╝ ██║   ██║
██║███╗██║██║██║╚██╗██║██║   ██║╚════██║   ██║   ██╔══██║██╔═██╗ ██║   ██║
╚███╔███╔╝██║██║ ╚████║╚██████╔╝███████║   ██║   ██║  ██║██║  ██╗╚██████╔╝
 ╚══╝╚══╝ ╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝

Feel free to propose new commands.
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
