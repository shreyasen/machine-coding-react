import { useState } from "react";

const FileNode = ({
  node,
  selectedFolderId,
  setSelectedFolderId,
  addNode,
  showInputForId,
  setShowInputForId,
  inputType,
  setInputType,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    if (node.type === "folder") {
      setIsExpanded(!isExpanded);
    }
  };

  const handleSelect = () => {
    if (node.type === "folder") {
      setSelectedFolderId(node.id);
      setShowInputForId(null); // Hide input when selecting a folder
    }
  };

  const handleAdd = (e) => {
    if (e.key === "Enter") {
      const name = e.target.value;
      if (name) {
        addNode(name, inputType);
      }
      setShowInputForId(null);
    }
  };

  return (
    <div style={{ marginLeft: 20 }}>
      <div
        onClick={() => {
          toggleExpand();
          handleSelect();
        }}
        style={{
          cursor: "pointer",
          backgroundColor:
            node.id === selectedFolderId ? "#d3d3d3" : "transparent",
        }}
      >
        {node.type === "folder" ? (isExpanded ? "📂" : "📁") : "📄"} {node.name}
      </div>

      {isExpanded && node.children && (
        <div>
          {node.children.map((childNode) => (
            <FileNode
              key={childNode.id}
              node={childNode}
              selectedFolderId={selectedFolderId}
              setSelectedFolderId={setSelectedFolderId}
              addNode={addNode}
              showInputForId={showInputForId}
              setShowInputForId={setShowInputForId}
              inputType={inputType}
              setInputType={setInputType}
            />
          ))}

          {/* Render input field below the selected folder */}
          {showInputForId === node.id && (
            <input
              type="text"
              placeholder={`Enter ${inputType} name`}
              onKeyDown={handleAdd}
              autoFocus
            />
          )}
        </div>
      )}
    </div>
  );
};

export default FileNode;
