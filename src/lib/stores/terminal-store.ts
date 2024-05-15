import type { IAsyncCommand, ICommand, IInteractiveCommand } from '$lib/types/command.interface';
import { writable } from 'svelte/store';

export const commandHistoryStore = writable<string[]>([]);
export const displayStore = writable<TERMINAL.TerminalMessage[]>([]);

export const updateDisplayStore = (message: TERMINAL.TerminalMessage) => {
  displayStore.update((display) => {
    const existingMessageIndex = display.findIndex((msg) => msg.id === message.id);
    if (existingMessageIndex !== -1) {
      const updatedDisplay = [...display];
      updatedDisplay[existingMessageIndex] = message;
      return updatedDisplay;
    } else {
      return display.concat(message);
    }
  });
};

export const directoryStore = writable<string[]>([]);

// handle in commands
export const interactiveCommandStore = writable<IInteractiveCommand | null>(null);

// handle in command processor
export const runningCommandStore = writable<ICommand | IAsyncCommand | null>(null);
