import { createTerminalMessage } from './uitls';

export function handle(command: string): TERMINAL.TerminalMessage {
  return createTerminalMessage({
    message: "I don't know this command: " + command.split(' ')[0],
    color: '#FF0000'
  });
}
