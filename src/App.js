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

  const { insertNode } = useTraverseTree();

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

  useEffect(() => {
    const handleChilders = (childs) => {
      childs?.map((child)=>{

        handleInsertNode(child.uid , )
      })
    }
  }, [childs]);

  const handleNodes = async () => {
    data?.nodes?.forEach((node) => {
      if (node.hasOwnProperty("parentRefs")) {
        setChilds((prevChilds) => [
          ...prevChilds,
          {
            id: node.parentRefs[0].uid,
            isFolder: true,
            name: node.name,
            items: [],
          },
        ]);
      } else {
        const newNode = { ...node, uid: node.uid, parentID: "1" };
        handleInsertNode(newNode.parentID, newNode.uid, newNode.name, true);
      }
    });
  };

  useEffect(() => {
    handleNodes();
  }, []);

  return (
    <div>
      {explorerData && (
        <Folder handleInsertNode={handleInsertNode} explorer={explorerData} />
      )}
    </div>
  );
}

export default App;
