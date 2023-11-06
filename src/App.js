import { useEffect, useState } from "react";
import "./App.css";
import Folder from "./components/Folder";
import explorer from "./data/FolderData";
import useTraverseTree, {
  mergeDataIntoExplorer,
} from "./hooks/use-traverse-tree";
import data from "./argocdTree.json";

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
  useEffect(() => {
    data?.nodes?.forEach((node) => {
      if (node.hasOwnProperty("parentRefs")) {
        setChilds((pre) => [...pre, node]);
      } else {
        node = { ...node, uid: new Date().getTime(), parentID: "1" };
        handleInsertNode(node.parentID, node.uid, node.name, true);
      }
    });
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
