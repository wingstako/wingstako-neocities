<script lang="ts">
	import { currentLineStore } from '$lib/stores/terminal-store';
	import { CommandProcessor } from '$lib/commands/processor';
	import { displayStore, commandHistoryStore } from '$lib/stores/terminal-store';
	import { onMount } from 'svelte';

	let commandPrefix = 'guest@wingstako.terminal % ';

	let commandHistoryIndex = $commandHistoryStore.length - 1;

	let command = '';

	let inputField: HTMLInputElement;

	const commandProcessor = CommandProcessor.getIntance();

	const onClick = (e: MouseEvent) => {
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
			const enteredCommand: TERMINAL.TerminalMessage = {
				message: commandPrefix + command
			};

			displayStore.update((value) => value.concat(enteredCommand));
			commandHistoryStore.update((value) => value.concat(command));
			commandHistoryIndex = $commandHistoryStore.length - 1;

			commandProcessor.process(command);

			command = '';
		}

        // onMount(() => {
        //     commandProcessor.process("wingstako")
        // });
	};

</script>

<div class="main-container" on:click={onClick}>
	<div class="terminal-container">
		<div>
			{#each $displayStore as value}
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
	}

	.terminal-container {
		overflow-y: scroll;
		/* margin-top: 10vh;
		margin-bottom: 10vh; */
		height: 80vh;
		/* background-color: black; */
		padding-top: 20px;
		padding-bottom: 10px;
		padding-left: 40px;
	}
</style>
