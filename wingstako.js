import * as fs from 'fs';
import dirTree from 'directory-tree';

const tree = dirTree('static/directory', { attributes: ['type', 'extension', 'mode', 'mtime'] });

// loop all nodes in the tree and remove `static/ or static\` from the path
function removeStaticFromPath(node) {
  if (node.path) {
    node.path = node.path.replace('static/', '').replace('static\\', '');
  }
  if (node.children) {
    node.children.forEach(removeStaticFromPath);
  }
}

removeStaticFromPath(tree);

fs.writeFileSync('static/directory.json', JSON.stringify(tree, null, 2));
