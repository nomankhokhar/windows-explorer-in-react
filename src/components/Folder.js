import React, { useState } from "react";

const Folder = ({ handleInsertNode = () => {}, explorer }) => {
  const [expand, setExpand] = useState(true);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: false,
  });

  const handleNewFolder = (e, isFolder) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder,
    });
  };

  const onAddFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      handleInsertNode(explorer.id, e.target.value, showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
    }
  };

  if (explorer.isFolder) {
    return (
      <div className="flex" style={{ marginTop: "5px" }}>
        <div onClick={() => setExpand(!expand)} className="folder">
          <span>📁 {explorer?.name}</span>{" "}
          <div>
            <button onClick={(e) => handleNewFolder(e, true)}>Folder +</button>
          </div>
        </div>

        <div style={{ display: expand ? "block" : "none" }}>
          {showInput.visible && (
            <div className="inputContainer">
              <span>{showInput.isFolder ? "📁" : "📄"}</span>
              <input
                type="text"
                className="inputContainer__input"
                autoFocus
                onKeyDown={onAddFolder}
                onBlur={() => setShowInput({ ...showInput, visible: false })}
              />
            </div>
          )}
          {explorer.items.length > 0 && (
            <div className="relative">
              <div className="border" style={{ marginLeft: "30px" }}>
                {explorer.items?.map((exp) => {
                  return (
                    <Folder
                      handleInsertNode={handleInsertNode}
                      key={exp.id}
                      explorer={exp}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default Folder;
