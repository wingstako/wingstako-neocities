export interface IFile {
    content: string;
}

export interface FileNode {
    name: string;
    type: 'file';
    fileType: 'text' | 'image';
    file: IFile;
}

export interface FolderNode {
    name: string;
    type: 'folder';
    children: Array<FileNode | FolderNode>;
}
