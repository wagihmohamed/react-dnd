import { DropResult } from "react-beautiful-dnd";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { columnsFromBackend } from "../mockup";
import { Task } from "../models";

interface TasksStore {
  tasks: typeof columnsFromBackend;
  handleDragEnd: (
    result: DropResult,
    columns: typeof columnsFromBackend
  ) => void;
  onEdit: (task: Partial<Omit<Task, "showDescription">>) => void;

  updateTask: (task: Task) => void;
}

export const useTasksStore = create<
  TasksStore,
  [["zustand/immer", TasksStore]]
>(
  immer((set) => ({
    tasks: columnsFromBackend,
    handleDragEnd: (result, columns) => {
      if (!result.destination) return;
      const { source, destination } = result;

      if (source.droppableId !== destination.droppableId) {
        const sourceColumn =
          columns[source.droppableId as keyof typeof columns];
        const destColumn =
          columns[destination.droppableId as keyof typeof columns];
        const sourceTasks = [...sourceColumn.items];
        const destTasks = [...destColumn.items];
        const [removed] = sourceTasks.splice(source.index, 1);
        const movedTask: Task = {
          ...removed,
          showDescription: !removed.showDescription,
        };

        destTasks.splice(destination.index, 0, movedTask);
        set({
          tasks: {
            ...columns,
            [source.droppableId]: {
              ...sourceColumn,
              items: sourceTasks,
            },
            [destination.droppableId]: {
              ...destColumn,
              items: destTasks,
            },
          },
        });
      } else {
        const column = columns[source.droppableId as keyof typeof columns];
        const copiedTasks = [...column.items];
        const [removed] = copiedTasks.splice(source.index, 1);
        copiedTasks.splice(destination.index, 0, removed);
        set({
          tasks: {
            ...columns,
            [source.droppableId]: {
              ...column,
              tasks: copiedTasks,
            },
          },
        });
      }
    },
    onEdit: ({ id, description, title }) => {
      const column = columnsFromBackend["tasks"];
      const copiedTasks = [...column.items];
      const taskIndex = copiedTasks.findIndex((task) => task.id === id);
      if (title) copiedTasks[taskIndex].title = title;
      if (description) copiedTasks[taskIndex].description = description;
      // copiedTasks[taskIndex].title = title;
      // copiedTasks[taskIndex].description = description;
      set({
        tasks: {
          ...columnsFromBackend,
          ["tasks"]: {
            ...column,
            items: copiedTasks,
          },
        },
      });
    },
    updateTask: (task) => {
      set((state) => {
        state.tasks.tasks.items.push(task);
      });
    },
  }))
);
