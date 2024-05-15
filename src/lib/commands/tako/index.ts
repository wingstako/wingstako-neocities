import { updateDisplayStore } from '$lib/stores/terminal-store';
import { createTerminalMessage } from '$lib/uitls';
import { v4 } from 'uuid';
import type { IAsyncCommand } from '../../types/command.interface';
import {
  type EngineInterface,
  type InitProgressReport,
  CreateEngine,
  type ChatCompletionRequest,
} from '@mlc-ai/web-llm';

export class TakoCommand implements IAsyncCommand {
  private selectedModel = 'Llama-3-8B-Instruct-q4f32_1';
  private engine: EngineInterface | null = null;

  private COMMAND_REGISTRY: { [command: string]: (args: string[]) => Promise<void> | void } = {
    init: this.handleInit.bind(this),
    reset: this.handleReset.bind(this),
    ask: this.handleAsk.bind(this),
  };

  async execute(args: string[]): Promise<void> {
    const command = this.COMMAND_REGISTRY[args[0].toLowerCase()];
    if (command) {
      await command(args.slice(1));
    } else {
      // handle unknown command
      this.sendErrorMessage(`Unknown tako command: ${args[0]}`);
    }

    // await this.init();
  }

  async handleInit(): Promise<void> {
    if (this.engine !== null) {
      this.sendErrorMessage('Already initialized!');
      return;
    }
    await this.init();
  }

  async init(): Promise<void> {
    const callbackMessage: TERMINAL.TerminalMessage = createTerminalMessage({
      id: v4(),
      message: 'Initializing...',
    });

    const initProgressCallback = (report: InitProgressReport) => {
      callbackMessage.message = report.text;
      updateDisplayStore(callbackMessage);
    };

    this.engine = await CreateEngine(
      this.selectedModel,
      { initProgressCallback: initProgressCallback },
      /*engineConfig=*/
    );
  }

  async handleAsk(args: string[]): Promise<void> {
    if (args.length < 1) {
      this.sendErrorMessage('Please provide a question!');
      return;
    }
    const question = args.join(' ');
    await this.ask(question);
  }

  async ask(question: string): Promise<void> {
    if (this.engine === null) {
      this.sendErrorMessage('Engine not initialized!');
      return;
    }

    const chatRequest: ChatCompletionRequest = {
      stream: true,
      messages: [{ role: 'user', content: question }],
      logprobs: true,
      top_logprobs: 2,
    };

    const replyChunks = await this.engine.chat.completions.create(chatRequest);

    let replyMessage = '';

    let message: TERMINAL.TerminalMessage = createTerminalMessage({
      id: v4(),
      message: replyMessage,
    });

    for await (const chunk of replyChunks) {
      console.log(chunk);
      if (chunk.choices[0].delta.content) {
        replyMessage += chunk.choices[0].delta.content;
      }
      (message.message = replyMessage), updateDisplayStore(message);
    }
  }

  handleReset(): void {
    this.engine = null;
  }

  sendErrorMessage(message: string): void {
    const terminalMessage = createTerminalMessage({
      id: v4(),
      message,
    });
    updateDisplayStore(terminalMessage);
  }
}
