import { displayStore } from '$lib/stores/terminal-store';
import { createTerminalMessage } from '$lib/uitls';
import type { ICommand } from '../../types/command.interface';

export class CurlCommand implements ICommand {
  execute(args: string[]): void {
    if (args[0] === undefined || args.length === 0) {
      const message = createTerminalMessage({
        message: '(づ ◕‿◕ )づ <span class="hidden-element">What do you expect</span>',
        html: true,
      });
      displayStore.update((display) => display.concat(message));
      return;
    }

    if (args[0].endsWith('.png') || args[0].endsWith('.jpg')) {
      const message = createTerminalMessage({
        message: `<img src="${args[0]}" alt="${args[0]}">`,
        html: true,
      });
      displayStore.update((display) => display.concat(message));
      return;
    }

    let contentType: string | null = '';
    // use fetch to mimic curl
    fetch(args[0])
      .then((response) => {
        // check response type
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // check response type
        contentType = response.headers.get('content-type');

        // Switch statement to check against multiple possible values
        switch (contentType) {
          case 'application/json':
            return response.json();
          case 'text/plain':
            return response.text();
          case 'text/html':
          default:
            throw new Error(`Sorry, content-type ${contentType} not supported`);
        }
      })
      .then((text) => {
        console.log(contentType);
        let formattedText = '';
        const charsPerLine = 80;
        for (let i = 0; i < text.length; i += charsPerLine) {
          formattedText += text.slice(i, i + charsPerLine) + '<br />';
        }
        const message = createTerminalMessage({
          message: formattedText,
          html: contentType === 'text/plain' ? true : false,
        });
        displayStore.update((display) => display.concat(message));
      })
      .catch((error) => {
        const message = createTerminalMessage({
          message: error,
          html: true,
        });
        displayStore.update((display) => display.concat(message));
      });
  }
}
