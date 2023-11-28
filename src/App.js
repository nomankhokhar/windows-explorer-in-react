import { useEffect, useState } from "react";
import "./App.css";
import Folder from "./components/Folder";
import useTraverseTree from "./hooks/use-traverse-tree";
import data from "./argocdTree.json";
import {
  TransformWrapper,
  TransformComponent,
  useControls,
} from "react-zoom-pan-pinch";

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

  const Controls = () => {
    const { zoomIn, zoomOut, resetTransform } = useControls();
    return (
      <>
        <button onClick={() => zoomIn()}>Zoom In</button>
        <button onClick={() => zoomOut()}>Zoom Out</button>
        <button onClick={() => resetTransform()}>Reset</button>
      </>
    );
  };

  return (
    <div style={{ border: "1px solid blue" }}>
      <TransformWrapper initialScale={0.5} minScale={0.5} maxScale={5}>
        <Controls />
        <TransformComponent>
          <div>
            <Folder
              handleInsertNode={handleInsertNode}
              explorer={explorerData}
            />
          </div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
}

export default App;
