import { directoryStore } from './stores/terminal-store';
import { get } from 'svelte/store';
import type { FolderNode, FileNode } from './types/directory.interface';

let directoryTree: FolderNode;

export class DirectoryService {
  static async init() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mapData = (data: any): FileNode | FolderNode => {
      if (data.type === 'file') {
        const fileNode: FileNode = {
          path: data.path,
          name: data.name,
          type: 'file',
          extension: data.extension,
        };
        return fileNode;
      } else if (data.type === 'directory') {
        const folderNode: FolderNode = {
          path: data.path,
          name: data.name,
          type: 'directory',
          children: data.children.map(mapData),
        };
        return folderNode;
      }
      throw new Error(`Unknown type: ${data.type}`);
    };

    const directoryJson = await fetch('/directory.json').then((res) => res.json());
    const mappedData = mapData(directoryJson) as FolderNode;
    directoryTree = mappedData;
  }

  public static getFoldersAndFiles(path: string): Array<FileNode | FolderNode> {
    const pathArray = path.split('/').filter((path) => path !== '');
    let currentDirectory = directoryTree;
    for (const path of pathArray) {
      const directory = currentDirectory.children.find((child) => child.name === path);
      if (directory === undefined) {
        return [];
      }
      // @ts-expect-error filenode does not have children
      currentDirectory = directory;
    }
    // return currentDirectory.children with sorted with name
    currentDirectory.children.sort((a, b) => a.name.localeCompare(b.name));
    return currentDirectory.children;
  }

  public static getFile(filepath: string): FileNode | null {
    // current directory
    const currentDirectory = [...get(directoryStore)];
    filepath.split('/').forEach((ele) => currentDirectory.push(ele));
    const pathArray = currentDirectory.filter((path) => path !== '');
    const filename = pathArray.pop();
    if (filename === undefined) {
      return null;
    }

    const directory = this.getFoldersAndFiles(pathArray.join('/'));
    const file = directory.find((child) => child.name === filename);
    if (file === undefined || file.type === 'directory') {
      return null;
    }

    return file;
  }

  public static getFolder(filepath: string): FolderNode | null {
    // current directory
    const currentDirectory = [...get(directoryStore)];
    filepath.split('/').forEach((ele) => currentDirectory.push(ele));
    const pathArray = currentDirectory.filter((path) => path !== '');
    const filename = pathArray.pop();
    if (filename === undefined) {
      return null;
    }

    const directory = this.getFoldersAndFiles(pathArray.join('/'));
    const file = directory.find((child) => child.name === filename);
    if (file === undefined || file.type === 'file') {
      return null;
    }

    return file;
  }
}
