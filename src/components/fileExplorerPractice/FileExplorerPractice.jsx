import { useState } from "react";
import { initialFileStructure } from "../../data/fileStructure";
import FolderNode from "./FolderNode";

const FileExplorerPractice = () => {
  const [folderStructure, setFolderStructure] = useState(initialFileStructure);
  const [id, setId] = useState(11);

  const addNodeToTree = (tree, parentId, newNode) => {
    return tree.map((treeNode) => {
      if (treeNode.id === parentId) {
        return {
          ...treeNode,
          children: [...treeNode.children, newNode],
          //   .sort((a, b) => {
          //     if (a.name < b.name) {
          //       return -1;
          //     } else if (a.name > b.name) {
          //       return 1;
          //     } else {
          //       return 0;
          //     }
          //   }),
        };
      }
      if (treeNode.children) {
        return {
          ...treeNode,
          children: addNodeToTree(treeNode.children, parentId, newNode),
        };
      }
      return treeNode;
    });
  };

  const addFolder = (parentId, name, type) => {
    const newNode = {
      id,
      name,
      type,
      ...(type === "folder" && { children: [] }),
    };
    const updatedFolderStructure = addNodeToTree(
      folderStructure,
      parentId,
      newNode
    );
    setFolderStructure(updatedFolderStructure);
    setId((prev) => prev + 1);
  };

  return (
    <div>
      {folderStructure.map((folder) => (
        <FolderNode node={folder} addFolder={addFolder} key={folder.id} />
      ))}
    </div>
  );
};

export default FileExplorerPractice;
