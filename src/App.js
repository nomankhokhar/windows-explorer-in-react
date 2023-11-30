import { useEffect, useState } from "react";
import "./App.css";
import Folder from "./components/Folder";
import useTraverseTree from "./hooks/use-traverse-tree";
import data from "./socks_app.json";
import Draggable from "react-draggable";

function App() {
  const [explorerData, setExplorerData] = useState({
    id: "1",
    parentID: "1",
    name: "guestbook",
    isFolder: true,
    kind: "applications",
    items: [],
  });

  const { insertNode } = useTraverseTree();

  const handleInsertNode = (parentID, folderId, item, kind) => {
    const finalTree = insertNode(explorerData, parentID, folderId, item, kind);
    setExplorerData((preFinalTree) => (preFinalTree = finalTree));
  };
  const [childs, setChilds] = useState([]);

  const [childDone, setChildDone] = useState(false);
  useEffect(() => {
    const handleChilders = () => {
      for (let i = 0; i <= childs.length; i++) {
        childs?.forEach((child) => {
          handleInsertNode(child.parentID, child.id, child.name, child.kind);
        });
      }
      setChildDone(true);
    };
    if (childs.length > 0) {
      handleChilders();
    }
  }, [childs]);

  useEffect(() => {
    const handleGrandChildern = () => {
      let children = [];
      data?.nodes?.forEach((node) => {
        if (node.hasOwnProperty("parentRefs")) {
          children = [...children, { ...node }];
        }
      });
      let childernList = [];
      for (let i = 0; i < children.length; i++) {
        for (let j = 0; j < children.length; j++) {
          if (children[i].uid === children[j].parentRefs[0].uid) {
            childernList = [...childernList, { ...children[j] }];
          }
        }
      }
      for (let i = 0; i < childernList.length; i++) {
        childernList.forEach((child) => {
          handleInsertNode(
            child.parentRefs[0].uid,
            child.uid,
            child.name,
            child.kind
          );
        });
      }
    };
    if (childDone) {
      handleGrandChildern();
    }
  }, [childDone]);

  const handleNodes = async () => {
    data?.nodes?.forEach((node) => {
      if (node.hasOwnProperty("parentRefs")) {
        setChilds((prevChilds) => [
          ...prevChilds,
          {
            id: node.uid,
            parentID: node.parentRefs[0].uid,
            isFolder: true,
            name: node.name,
            kind: node.kind,
            items: [],
          },
        ]);
      } else {
        const newNode = { ...node, uid: node.uid, parentID: "1" };
        handleInsertNode(
          newNode.parentID,
          newNode.uid,
          newNode.name,
          newNode.kind
        );
      }
    });
  };

  useEffect(() => {
    handleNodes();
  }, []);

  const [scale, setScale] = useState(0.8);

  const handleZoomIn = () => {
    if (scale < 1) {
      setScale(scale + 0.05);
    }
  };

  const handleZoomOut = () => {
    if (scale > 0.8) {
      setScale(scale - 0.05);
    }
  };

  return (
    <div>
      <div className="controls">
        <button onClick={handleZoomIn}>Zoom In</button>
        <button onClick={handleZoomOut}>Zoom Out</button>
      </div>
      <div
        style={{
          transform: `scale(${scale})`,
          transition: "transform 0.3s ease-in-out",
        }}
      >
        <Draggable>
          <div>
            <Folder
              handleInsertNode={handleInsertNode}
              explorer={explorerData}
            />
          </div>
        </Draggable>
      </div>
    </div>
  );
}

export default App;
