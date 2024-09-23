import { useState } from "react";
import { addNodeToTree } from "../../utils/addNodeToTree";
import { initialFileStructure } from "../../data/fileStructure";
import FileNode from "./FileNode";

const FileExplorer = () => {
  const [fileStructure, setFileStructure] = useState(initialFileStructure);
  const [nextId, setNextId] = useState(11);
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [showInputForId, setShowInputForId] = useState(null); // Tracks which folder should show input
  const [inputType, setInputType] = useState(""); // Tracks whether input is for file or folder

  const addNode = (name, type) => {
    const newNode = {
      id: nextId,
      name,
      type,
      ...(type === "folder" && { children: [] }), // Only folders have children
    };

    const updatedFileStructure = addNodeToTree(
      fileStructure,
      selectedFolderId,
      newNode
    );
    setFileStructure(updatedFileStructure);
    setNextId(nextId + 1); // Increment the ID for the next addition
  };

  const handleAddButtonClick = (type) => {
    setInputType(type);
    setShowInputForId(selectedFolderId); // Show input for the selected folder
  };

  return (
    <div>
      <h3>File Explorer</h3>

      <div>
        <button
          onClick={() => handleAddButtonClick("folder")}
          disabled={!selectedFolderId}
        >
          + Add Folder
        </button>
        <button
          onClick={() => handleAddButtonClick("file")}
          disabled={!selectedFolderId}
        >
          + Add File
        </button>
        {selectedFolderId ? (
          <span> (Adding to folder ID: {selectedFolderId})</span>
        ) : (
          <span> (No folder selected)</span>
        )}
      </div>

      <div>
        {fileStructure.map((node) => (
          <FileNode
            key={node.id}
            node={node}
            selectedFolderId={selectedFolderId}
            setSelectedFolderId={setSelectedFolderId}
            addNode={addNode}
            showInputForId={showInputForId}
            setShowInputForId={setShowInputForId}
            inputType={inputType}
            setInputType={setInputType}
          />
        ))}
      </div>
    </div>
  );
};

export default FileExplorer;
