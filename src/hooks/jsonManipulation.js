import { handleInsertNodes } from "../App";

export const jsonManipulation = (data) => {
  data?.nodes?.forEach((node) => {
    if (node.hasOwnProperty("parentRefs")) {
    } else {
      const newNode = { ...node, uid: new Date().getTime(), parentID: "1" };
      handleInsertNodes(newNode.parentID, newNode.uid, newNode.name, true);
    }
  });
};
