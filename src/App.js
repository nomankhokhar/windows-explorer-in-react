import { useEffect, useState } from "react";
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

  const GetTableResources = async (argoCdData) => {
    const currentData = argoCdData;
    const tablekind = ["Deployment", "StatefulSet", "Secret", "Service"];
    const explorerDataCopy = { ...explorerData };

    tablekind.forEach((kind, index) => {
      const currentObject = currentData.filter((obj) => obj.kind === kind);
      const newArray = currentObject.map((obj) => ({
        id: new Date().getTime() + obj.metadata.name,
        name: obj.metadata.name,
        isFolder: true,
        items: [],
      }));

      explorerDataCopy.items[index].items.push(...newArray);
    });

    setExplorerData((pre) => (pre = explorerDataCopy));
  };

  useEffect(() => {
    GetTableResources(argoCdData);
  }, []);

  return (
    <div className="fullHeight">
      <Folder handleInsertNode={handleInsertNode} explorer={explorerData} />
    </div>
  );
}

export default App;
