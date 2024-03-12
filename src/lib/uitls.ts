import { v4 } from 'uuid';

interface createTerminalMessageOptions {
  message: string;
  html?: boolean;
  color?: string;
}

export const createTerminalMessage = (
  options: createTerminalMessageOptions
): TERMINAL.TerminalMessage => {
  return {
    id: v4(),
    message: options.message,
    html: options.html,
    color: options.color
  };
};
