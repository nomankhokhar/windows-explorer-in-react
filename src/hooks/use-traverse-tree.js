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
