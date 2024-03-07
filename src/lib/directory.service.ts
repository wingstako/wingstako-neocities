import { directoryStore } from "./stores/terminal-store";
import { get } from "svelte/store";
import type { FolderNode, FileNode } from "./types/directory.interface";
import { WorldlineFile } from "./files/jobs-worldline.file";
import { ACUFile } from "./files/jobs-acu.file";
import { HKJCFile } from "./files/jobs-hkjc.file";
import { TnTSupermarketFile } from "./files/jobs-tnt.file";

const directoryTree: FolderNode = {
    name: '~',
    type: 'folder',
    children: [
        {
            name: 'jobs',
            type: 'folder',
            children: [
                { name: 'worldline.txt', type: 'file', fileType: 'text', file: new WorldlineFile() },
                { name: 'acu.txt', type: 'file', fileType: 'text', file: new ACUFile() },
                { name: 'hkjc.txt', type: 'file', fileType: 'text', file: new HKJCFile() },
                { name: 'tnt-supermarket.txt', type: 'file', fileType: 'text', file: new TnTSupermarketFile() },
            ],
        },
        {
            name: 'logs',
            type: 'folder',
            children: []
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
        // return currentDirectory.children with sorted with name
        currentDirectory.children.sort((a, b) => a.name.localeCompare(b.name));
        return currentDirectory.children;
    }


    public static getFile(filepath: string): FileNode | null {
        // current directory
        const currentDirectory = [...get(directoryStore)];
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
        const currentDirectory = [...get(directoryStore)];
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