import { DirectoryService } from './directory.service';

export class AutoCompleteService {
  public static getNextCompletion(path: string, input: string): string {
    const directory = DirectoryService.getFoldersAndFiles(path);
    if (!directory) return input;

    const command = input.split(' ');
    const autoComplete = command[command.length - 1];

    let autoCompleteYield = autoComplete;

    const files = directory.filter((item) => item.name.startsWith(autoComplete));
    if (files.length !== 0) {
      // now we just grab the first file, could be more sophisticated here and check if there are multiple files with the same prefix
      autoCompleteYield = files[0].name;
    }
    command[command.length - 1] = autoCompleteYield;

    return command.join(' ');
  }
}
