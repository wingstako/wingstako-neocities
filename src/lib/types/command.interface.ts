export interface ICommand {
  execute(args: string[]): void;
}

export interface IAsyncCommand {
  execute(args: string[]): Promise<void>;
}

export interface IInteractiveCommand extends IAsyncCommand {
  update(input: string): Promise<void>;
}
