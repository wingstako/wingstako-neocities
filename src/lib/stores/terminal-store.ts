import type {  IInteractiveCommand } from '$lib/types/command.interface';
import { writable } from 'svelte/store';

export const commandHistoryStore = writable<string[]>([]);
export const displayStore = writable<TERMINAL.TerminalMessage[]>([]);
export const directoryStore = writable<string[]>([]);

export const runningCommandStore = writable<IInteractiveCommand | null>(null);