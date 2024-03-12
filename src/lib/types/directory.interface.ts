export interface FileNode {
  path: string;
  name: string;
  type: 'file';
  extension: string;
}

export interface FolderNode {
  path: string;
  name: string;
  type: 'directory';
  children: Array<FileNode | FolderNode>;
}
