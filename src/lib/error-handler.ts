import { createTerminalMessage } from './uitls';

export function handleUnknownCommand(command: string): TERMINAL.TerminalMessage {
  return createTerminalMessage({
    message: "I don't know this command: " + command.split(' ')[0],
    color: '#FF0000',
  });
}

export function handleUnexpectedError(error: Error): TERMINAL.TerminalMessage {
  return createTerminalMessage({
    message: error.message,
    color: '#FF0000',
  });
}
