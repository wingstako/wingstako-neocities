<script lang="ts">
	import { currentLineStore } from '$lib/stores/terminal-store';
	import { CommandProcessor } from '$lib/processor';
	import { displayStore, commandHistoryStore } from '$lib/stores/terminal-store';
	import { onMount } from 'svelte';
	import { createTerminalMessage } from '$lib/uitls';

	let commandPrefix = 'guest@wingstako.terminal % ';

	let commandHistoryIndex = $commandHistoryStore.length - 1;

	let command = '';

	let inputField: HTMLInputElement;

	let outerContainer: HTMLDivElement, innerContainer: HTMLDivElement;

	const commandProcessor = CommandProcessor.getIntance();

	const onClick = (_e: MouseEvent) => {
		inputField.focus();
	};

	const onKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'ArrowUp') {
			command = $commandHistoryStore[commandHistoryIndex];
			if (commandHistoryIndex > 0) {
				commandHistoryIndex--;
			}
		} else if (e.key === 'ArrowDown') {
			if (commandHistoryIndex < $commandHistoryStore.length) {
				commandHistoryIndex++;
			}
			command = $commandHistoryStore[commandHistoryIndex];
		} else if (e.key === 'Enter') {
			const enteredCommand: TERMINAL.TerminalMessage = createTerminalMessage({
				message: commandPrefix + command
			});

			displayStore.update((value) => value.concat(enteredCommand));
			commandHistoryStore.update((value) => value.concat(command));
			commandHistoryIndex = $commandHistoryStore.length - 1;

			commandProcessor.process(command);

			command = '';

			inputField.focus();
		}
	};

	function scrollToBottom() {
		setTimeout(() => {
			if (innerContainer) {
				innerContainer.scrollTop = innerContainer.scrollHeight;
			}
		}, 10);
	}

	$: $displayStore, scrollToBottom();

	onMount(() => {
		const init_msg: TERMINAL.TerminalMessage = createTerminalMessage({
			message: `
    Welcome traveler, <br>
    Please enter "help" to check available commands.
    `,
			html: true
		});

		displayStore.update((value) => value.concat(init_msg));
	});
</script>

<div class="main-container" on:click={onClick} bind:this={outerContainer}>
	<div class="terminal-container" bind:this={innerContainer}>
		<div>
			{#each $displayStore as value (value.id)}
				{#if value.html}
					{@html value.message}
				{:else}
					<div style="color: {value.color};">{value.message}</div>
				{/if}
			{/each}

			{#if $currentLineStore && $currentLineStore != ''}
				<div>{$currentLineStore}</div>
			{:else}
				<div>
					{commandPrefix}<input
						type="text"
						autofocus
						bind:value={command}
						on:keydown={onKeyDown}
						bind:this={inputField}
					/>
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	input[type='text'] {
		background-color: transparent;
		border: 0;
		border-width: 0;
		outline: none;
	}

	.main-container {
		margin: auto;
		height: 100vh;
		width: 100vw;
		background-color: rgb(36, 29, 29);
		overflow-y: auto;
	}

	.terminal-container {
		overflow-y: scroll;
		/* margin-top: 10vh;
		margin-bottom: 10vh; */
		height: 100vh;
		/* background-color: black; */
		padding-top: 20px;
		padding-bottom: 10px;
		padding-left: 40px;
		overflow-y: auto;
	}
</style>
