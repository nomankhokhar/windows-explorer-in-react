import React, { useState } from "react";

const Folder = ({ handleInsertNode = () => {}, explorer }) => {
  const [expand, setExpand] = useState(true);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: false,
  });

  const onAddFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      handleInsertNode(explorer.id, e.target.value, showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
    }
  };

  if (explorer.isFolder) {
    return (
      <div className="flex" style={{ marginTop: "5px" }}>
        <div className="folder">
          <div className="flex">
            <div className="padding">&#x1F60A;</div>
            <div className="item-flex">
              <div>{explorer?.name.slice(0, 15)}</div>
              <div className="description">
                {explorer?.kind} &#x1F49A; &#x2713;
              </div>
            </div>
          </div>
          <div className="flex-buttons">
            <button className="btn-button" onClick={(e) => setExpand(!expand)}>
              ⋮
            </button>
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
          {explorer?.items?.length > 0 && (
            <div className="relative">
              <div className="border" style={{ marginLeft: "30px" }}>
                {explorer?.items?.map((exp, index) => {
                  return (
                    <Folder
                      handleInsertNode={handleInsertNode}
                      key={index}
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
