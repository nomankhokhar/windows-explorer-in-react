import { useEffect, useState } from "react";
import "./App.css";
import Folder from "./components/Folder";
import explorer from "./data/FolderData";
import useTraverseTree from "./hooks/use-traverse-tree";
import data from "./argocdTree.json";
import { jsonManipulation } from "./hooks/jsonManipulation";

export const handleInsertNodes = (parentID, folderId, item, isFolder) => {
  handleInsertNode(parentID, folderId, item, isFolder);
};

function App() {
  const [explorerData, setExplorerData] = useState(explorer);

  const { insertNode, deleteNode } = useTraverseTree();

  const handleInsertNode = (parentID, folderId, item, isFolder) => {
    const finalTree = insertNode(
      explorerData,
      parentID,
      folderId,
      item,
      isFolder
    );
    setExplorerData(finalTree);
  };

  const [childs, setChilds] = useState([]);
  const [parents, setParents] = useState([]);

  useEffect(() => {
    jsonManipulation(data);
  }, []);

  const handleDeleteNode = (id) => {
    const finalTree = deleteNode(explorerData, id);
    setExplorerData(finalTree);
  };

  // useEffect(() => {
  //   const updatedExplorer = mergeDataIntoExplorer(explorer, data.nodes);

  //   setExplorerData(updatedExplorer);
  // }, []);

  return (
    <div>
      {explorerData && (
        <Folder
          handleInsertNode={handleInsertNode}
          explorer={explorerData}
          handleDeleteNode={handleDeleteNode}
        />
      )}
    </div>
  );
}

export default App;
