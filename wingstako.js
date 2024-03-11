import * as fs from 'fs';
import dirTree from 'directory-tree';

const tree = dirTree("static/directory", { attributes: ['type', 'extension', 'mode', 'mtime'] });

fs.writeFileSync('static/directory.json', JSON.stringify(tree, null, 2));