interface FileNode {
    name: string;
    type: 'file';
}

interface FolderNode {
    name: string;
    type: 'folder';
    children: Array<FileNode | FolderNode>;
}

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
                { name: 'file1.txt', type: 'file' },
                { name: 'file2.txt', type: 'file' },
                {
                    name: 'subfolder',
                    type: 'folder',
                    children: [
                        { name: 'subfile.txt', type: 'file' }
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
        const pathArray = filepath.split('/').filter((path) => path !== '');
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
}