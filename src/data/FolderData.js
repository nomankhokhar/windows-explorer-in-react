const explorer = {
  id: "1",
  name: "root",
  isFolder: true,
  items: [
    {
      id: "2",
      name: "public",
      isFolder: true,
      items: [
        {
          id: "3",
          name: "public nested 1",
          isFolder: true,
          items: [
            {
              id: "4",
              name: "index",
              isFolder: true,
              items: [],
            },
            {
              id: "5",
              name: "hello",
              isFolder: true,
              items: [],
            },
          ],
        },
        {
          id: "6",
          name: "public_nested_file",
          isFolder: true,
          items: [],
        },
      ],
    },
    {
      id: "7",
      name: "src",
      isFolder: true,
      items: [
        {
          id: "8",
          name: "App",
          isFolder: true,
          items: [],
        },
        {
          id: "9",
          name: "Index Folder",
          isFolder: true,
          items: [],
        },
        {
          id: "10",
          name: "styles",
          isFolder: true,
          items: [
            {
              id: "14",
              name: "Sir Mussa",
              isFolder: true,
              items: [],
            },
          ],
        },
      ],
    },
    {
      id: "11",
      name: "packages",
      isFolder: true,
      items: [],
    },
  ],
};

export default explorer;
