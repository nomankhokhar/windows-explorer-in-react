import { useEffect, useState } from "react";
import "./App.css";
import Folder from "./components/Folder";
import explorer from "./data/FolderData";
import useTraverseTree, {
  mergeDataIntoExplorer,
} from "./hooks/use-traverse-tree";
import data from "./argocdTree.json";

function App() {
  const [explorerData, setExplorerData] = useState({});

  const { insertNode, deleteNode } = useTraverseTree();
  const handleInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(explorerData, folderId, item, isFolder);
    setExplorerData(finalTree);
  };

  const handleDeleteNode = (id) => {
    const finalTree = deleteNode(explorerData, id);
    setExplorerData(finalTree);
  };

  useEffect(() => {
    const updatedExplorer = mergeDataIntoExplorer(explorer, data.nodes);

    setExplorerData(updatedExplorer);
  }, []);

  console.log(data);

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
