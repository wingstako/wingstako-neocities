import { v4 } from 'uuid';

interface createTerminalMessageOptions {
  id?: string;
  message: string;
  html?: boolean;
  color?: string;
}

export const createTerminalMessage = (
  options: createTerminalMessageOptions,
): TERMINAL.TerminalMessage => {
  return {
    id: options.id ?? v4(),
    message: options.message,
    html: options.html,
    color: options.color,
  };
};
