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

    let latestNode = [];
    latestNode = tree.items.map((exp) => {
      return insertNode(exp, folderId, item, isFolder);
    });
    return { ...tree, items: latestNode };
  };

  return { insertNode };
};

export default useTraverseTree;
