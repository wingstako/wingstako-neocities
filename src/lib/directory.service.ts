import { directoryStore } from "./stores/terminal-store";
import { get } from "svelte/store";
import type { FolderNode, FileNode } from "./types/directory.interface";
import { WorldlineFile } from "./files/jobs-worldline.file";

const directoryTree: FolderNode = {
    name: '~',
    type: 'folder',
    children: [
        {
            name: 'jobs',
            type: 'folder',
            children: [],
        },
        {
            name: 'logs',
            type: 'folder',
            children: [
                { name: 'file1.txt', type: 'file', fileType: 'text', file: new WorldlineFile()},
                { name: 'file2.txt', type: 'file', fileType: 'text', file: { content: 'Hello World' }},
                {
                    name: 'subfolder',
                    type: 'folder',
                    children: [
                        { name: 'subfile.txt', type: 'file', fileType: 'text', file: { content: 'Hello World' }},
                    ]
                }
            ]
        }
    ]
};

export class DirectoryService {
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
        return currentDirectory.children;
    }


    public static getFile(filepath: string): FileNode | null {
        // current directory
        const currentDirectory = get(directoryStore);
        filepath.split('/').forEach(ele => currentDirectory.push(ele))
        const pathArray = (currentDirectory).filter((path) => path !== '');
        const filename = pathArray.pop();
        if (filename === undefined) {
            return null;
        }

        const directory = this.getFoldersAndFiles(pathArray.join('/'));
        const file = directory.find((child) => child.name === filename);
        if (file === undefined || file.type === 'folder') {
            return null;
        }

        return file;
    }

    public static getFolder(filepath: string): FolderNode | null {

        // current directory
        const currentDirectory = get(directoryStore);
        filepath.split('/').forEach(ele => currentDirectory.push(ele))
        const pathArray = (currentDirectory).filter((path) => path !== '');
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