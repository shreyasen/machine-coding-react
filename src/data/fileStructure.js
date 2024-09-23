export const initialFileStructure = [
  {
    id: 1,
    name: "src",
    type: "folder",
    children: [
      { id: 2, name: "App.js", type: "file" },
      { id: 3, name: "index.js", type: "file" },
      {
        id: 4,
        name: "components",
        type: "folder",
        children: [
          { id: 5, name: "Header.js", type: "file" },
          { id: 6, name: "Footer.js", type: "file" },
        ],
      },
    ],
  },
  {
    id: 7,
    name: "public",
    type: "folder",
    children: [
      { id: 8, name: "index.html", type: "file" },
      { id: 9, name: "favicon.ico", type: "file" },
    ],
  },
  { id: 10, name: "package.json", type: "file" },
];
