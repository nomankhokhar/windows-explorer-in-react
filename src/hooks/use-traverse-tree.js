const useTraverseTree = () => {
  const insertNode = function (tree, parentID, folderId, item, kind) {
    if (tree.id === parentID) {
      const existingItem = tree.items.find((item) => item.id === folderId);
      if (!existingItem) {
        tree.items.unshift({
          id: folderId,
          parentID: parentID,
          name: item,
          isFolder: true,
          items: [],
          kind: kind,
        });
      }

      return tree;
    }

    let latestNode = tree?.items?.map((exp) => {
      return insertNode(exp, parentID, folderId, item, kind);
    });
    return { ...tree, items: latestNode };
  };

  const deleteNode = function (tree, nodeId) {
    if (tree.id === nodeId) {
      return null;
    }

    let updatedItems = tree.items
      ?.map((item) => deleteNode(item, nodeId))
      ?.filter((subtree) => subtree !== null);

    return { ...tree, items: updatedItems };
  };

  return { insertNode, deleteNode };
};

export default useTraverseTree;
