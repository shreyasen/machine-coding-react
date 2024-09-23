import { useState } from "react";

const FolderNode = ({ node, addFolder }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [type, setType] = useState("");

  const onFolderClick = () => {
    if (node.type === "folder") setIsExpanded(!isExpanded);
  };

  const handleAddButtonClick = (e, type) => {
    e.stopPropagation();
    setShowInput(true);
    setIsExpanded(true);
    setType(type);
  };

  const onEnterKeyPress = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      // add logic
      addFolder(node.id, e.target.value, type);
      setShowInput(false);
    }
  };

  return (
    <div style={{ paddingLeft: "20px" }}>
      <div onClick={onFolderClick}>
        {node.type === "folder" ? "📁" : "📄"}
        {node.name}

        {node.type === "folder" && (
          <>
            <button onClick={(e) => handleAddButtonClick(e, "folder")}>
              Folder +
            </button>
            <button onClick={(e) => handleAddButtonClick(e, "file")}>
              File +
            </button>
            {showInput && (
              <div style={{ paddingLeft: "20px" }}>
                <input
                  type="text"
                  autoFocus
                  onKeyDown={onEnterKeyPress}
                  onBlur={() => setShowInput(false)}
                />
              </div>
            )}
          </>
        )}
      </div>
      {isExpanded &&
        node.children?.map((child) => (
          <FolderNode node={child} addFolder={addFolder} key={child.id} />
        ))}
    </div>
  );
};

export default FolderNode;
