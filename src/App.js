import { useEffect, useState } from "react";
import "./App.css";
import Folder from "./components/Folder";
import useTraverseTree from "./hooks/use-traverse-tree";
import data from "./socks_app.json";

function App() {
  const [explorerData, setExplorerData] = useState({
    id: "1",
    parentID: "1",
    name: "guestbook",
    isFolder: true,
    items: [],
  });

  const { insertNode } = useTraverseTree();

  const handleInsertNode = (parentID, folderId, item) => {
    const finalTree = insertNode(explorerData, parentID, folderId, item);
    setExplorerData((preFinalTree) => (preFinalTree = finalTree));
  };

  const [childs, setChilds] = useState([]);

  useEffect(() => {
    const handleChilders = () => {
      childs?.map((child) => {
        handleInsertNode(child.parentID, child.id, child.name);
      });
    };
    if (childs.length > 0) {
      handleChilders();
      console.log(childs);
    }
  }, [childs]);

  const handleNodes = async () => {
    data?.nodes?.forEach((node) => {
      if (node.hasOwnProperty("parentRefs")) {
        setChilds((prevChilds) => [
          ...prevChilds,
          {
            id: node.parentRefs[0].uid,
            parentID: node.parentRefs[0].uid,
            isFolder: true,
            name: node.name,
            items: [],
          },
        ]);
      } else {
        const newNode = { ...node, uid: node.uid, parentID: "1" };
        handleInsertNode(newNode.parentID, newNode.uid, newNode.name);
      }
    });
  };

  useEffect(() => {
    handleNodes();

    return () => {
      setExplorerData({
        id: "1",
        parentID: "1",
        name: "guestbook",
        isFolder: true,
        items: [],
      });
    };
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
