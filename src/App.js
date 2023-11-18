import { useEffect, useState } from "react";
import "./App.css";
import Folder from "./components/Folder";
import useTraverseTree from "./hooks/use-traverse-tree";
import data from "./argocdTree.json";

function App() {
  const [explorerData, setExplorerData] = useState({
    id: "1",
    parentID: "1",
    name: "guestbook",
    isFolder: true,
    items: [],
  });

  const { insertNode, deleteNode } = useTraverseTree();

  const handleInsertNode = (parentID, folderId, item, isFolder) => {
    const finalTree = insertNode(
      explorerData,
      parentID,
      folderId,
      item,
      isFolder
    );
    setExplorerData((preFinalTree) => (preFinalTree = finalTree));
  };

  const [childs, setChilds] = useState([]);
  const [parents, setParents] = useState([]);

  const handleNodes = async () => {
    data?.nodes?.forEach((node) => {
      if (node.hasOwnProperty("parentRefs")) {
        setChilds((prevChilds) => [...prevChilds, node]);
      } else {
        const newNode = { ...node, uid: new Date().getTime(), parentID: "1" };
        handleInsertNode(newNode.parentID, newNode.uid, newNode.name, true);
      }
    });
  };

  const handleDeleteNode = (id) => {
    const finalTree = deleteNode(explorerData, id);
    setExplorerData(finalTree);
  };

  useEffect(() => {
    handleNodes();
  }, []);

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
