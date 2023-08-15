import { Task } from "../models";

export const data: Task[] = [
  {
    id: "1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent.",
    title: "task1",
    showDescription: true,
  },
];

export const columnsFromBackend = {
  tasks: {
    items: data,
  },
  finish: {
    items: [],
  },
};
