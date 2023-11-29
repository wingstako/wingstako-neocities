import { writable } from 'svelte/store';

export const commandHistoryStore = writable<string[]>([]);
export const displayStore = writable<TERMINAL.TerminalMessage[]>([]);
export const currentLineStore = writable<string>();
export const directoryStore = writable<string>();