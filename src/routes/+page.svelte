<script lang="ts">
  import { CommandProcessor } from '$lib/command-processor';
  import {
    displayStore,
    commandHistoryStore,
    directoryStore,
    runningCommandStore
  } from '$lib/stores/terminal-store';
  import { onMount } from 'svelte';
  import { createTerminalMessage } from '$lib/uitls';
  import { AutoCompleteService } from '$lib/auto-complete.service';

  let commandPrefix = 'guest@wingstako.terminal ';

  let commandHistoryIndex = $commandHistoryStore.length - 1;

  let command = '';

  let inputField: HTMLTextAreaElement;

  let innerContainer: HTMLDivElement;

  const commandProcessor = CommandProcessor.getInstance();

  const onKeyDown = (e: KeyboardEvent) => {
    if (inputField) inputField.focus();
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
      e.preventDefault();
      const enteredCommand: TERMINAL.TerminalMessage = createTerminalMessage({
        message: `<p>
					<span style="color:#00FF00;">${commandPrefix}</span>
					<span style="color:#FFFF00;">${displayedDirectory}</span> 
					<br>$ <span>${command}</span>
					</p>`,
        html: true
      });
      displayStore.update((value) => value.concat(enteredCommand));
      commandHistoryStore.update((value) => value.concat(command));
      commandHistoryIndex = $commandHistoryStore.length - 1;
      commandProcessor.process(command);
      command = '';
      if (inputField) inputField.focus();
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const suggestion = AutoCompleteService.getNextCompletion($directoryStore.join('/'), command);
      if (suggestion) {
        command = suggestion;
      }
    }
  };

  function scrollToBottom() {
    setTimeout(() => {
      if (innerContainer) {
        innerContainer.scrollTop = innerContainer.scrollHeight;
      }
    }, 10);
  }

  function adjustHeight() {
    inputField.style.height = 'auto';
    inputField.style.height = inputField.scrollHeight + 'px';
  }

  $: $directoryStore;

  $: $displayStore, scrollToBottom();

  $: displayedDirectory = $directoryStore.length > 0 ? '~/' + $directoryStore.join('/') : '~';

  $: if (inputField) adjustHeight();

  onMount(() => {
    adjustHeight();
    const init_msg: TERMINAL.TerminalMessage = createTerminalMessage({
      message: `
    Welcome traveler, <br>
    Please enter "help" to check available commands.
    `,
      html: true
    });

    displayStore.update((value) => value.concat(init_msg));

    const handleGlobalKeydown = () => {
      if (inputField) inputField.focus();
    };
    window.addEventListener('keydown', handleGlobalKeydown);

    return () => {
      window.removeEventListener('keydown', handleGlobalKeydown);
    };
  });
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="main-container">
  <div class="terminal-container" bind:this={innerContainer}>
    <div>
      {#each $displayStore as value (value.id)}
        {#if value.html}
          {@html value.message}
        {:else}
          <div style="color: {value.color};">{value.message}</div>
        {/if}
      {/each}

      {#if $runningCommandStore === null}
        <div>
          <span style="color:#00FF00;">{commandPrefix}</span>
          <span style="color:#FFFF00;">{displayedDirectory}</span>
          <div class="textarea-container">
            <textarea
              bind:value={command}
              on:input={adjustHeight}
              on:keydown={onKeyDown}
              bind:this={inputField}
            />
          </div>
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  textarea {
    background-color: transparent;
    border: 0;
    border-width: 0;
    outline: none;
    width: 90vw;
    resize: none;
    overflow-y: auto;
    height: auto;
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
    padding-right: 40px;
    overflow-y: auto;
    word-break: break-all;
  }
</style>
