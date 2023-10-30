import { useState } from "react";
import "./App.css";
import Folder from "./components/Folder";
import explorer from "./data/FolderData";
import useTraverseTree from "./hooks/use-traverse-tree";
import argoCdData from "./argocd.json";

function App() {
  const [explorerData, setExplorerData] = useState(explorer);

  const { insertNode } = useTraverseTree();
  const handleInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(explorerData, folderId, item, isFolder);
    setExplorerData(finalTree);
  };

  console.log(argoCdData);

  return (
    <div>
      <Folder handleInsertNode={handleInsertNode} explorer={explorerData} />
    </div>
  );
}

export default App;
