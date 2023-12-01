import { displayStore } from '$lib/stores/terminal-store';
import { createTerminalMessage } from '$lib/uitls';
import type { ICommand } from '../types/command.interface';

export class HelpCommand implements ICommand {
	execute(): void {
		const availableCommand: {name:string, desription:string}[] = [
			{name: 'help', desription: ''},
			{name: 'clear', desription: ''},
			{name: 'wingstako', desription: ''},
			{name: 'bocchi', desription: ''},
			{name: 'echo', desription: ''},
			{name: 'cd', desription: '[dir]'},
		];

		//sort by name alphabetically
		availableCommand.sort((a, b) => a.name.localeCompare(b.name));

		// output is the normalized availableCommand in the form of "name description"
		let output = availableCommand.map((command) => `${command.name} ${command.desription}`).join('<br>');

		// add introduction at the start of output
		const introduction = 'Available commands:<br>';
		output = introduction.concat(output);

		const message = createTerminalMessage({
			message: output,
			html: true,
		});

		displayStore.update((display) => display.concat(message));
	}
}
