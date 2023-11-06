const useTraverseTree = () => {
  const insertNode = function (tree, folderId, item, isFolder) {
    if (tree.id === folderId && tree.isFolder) {
      tree.items.unshift({
        id: new Date().getTime(),
        name: item,
        isFolder: isFolder,
        items: [],
      });

      return tree;
    }

    let latestNode = tree.items.map((exp) => {
      return insertNode(exp, folderId, item, isFolder);
    });
    return { ...tree, items: latestNode };
  };

  const deleteNode = function (tree, nodeId) {
    if (tree.id === nodeId) {
      return null;
    }

    let updatedItems = tree.items
      ?.map((item) => deleteNode(item, nodeId)) // Recursively delete the node from child items
      ?.filter((subtree) => subtree !== null); // Remove deleted subtrees

    return { ...tree, items: updatedItems };
  };

  return { insertNode, deleteNode };
};

export default useTraverseTree;

export function mergeDataIntoExplorer(explorer, data) {
  // Assuming the data is an array of objects like in the "nodes" array
  data.forEach((node) => {
    if (
      node.kind === "Service" ||
      node.kind === "Pod" ||
      node.kind === "Deployment" ||
      node.kind === "ReplicaSet"
    ) {
      // Create a new item to represent the node
      const newNode = {
        id: node.uid,
        name: node.name,
        isFolder: false, // Assuming these are not folders
        // You can add other properties based on your needs
      };

      // Find the parent folder in the explorer and add the newNode
      explorer.items.forEach((folder) => {
        if (folder.name === node.namespace) {
          folder.items.push(newNode);
        }
      });
    }
  });

  return explorer;
}
