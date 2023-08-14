import { create } from "zustand";
import { columnsFromBackend } from "../mockup";
import { DropResult } from "react-beautiful-dnd";

interface TasksStore {
    tasks: typeof columnsFromBackend;
    handleDragEnd: (
        result: DropResult,
        columns: typeof columnsFromBackend,
    ) => void;
    handleEditTask: (
        taskId: string,
        taskTitle: string,
        taskDescription: string,
    ) => void;
}

export const useTasksStore = create<TasksStore>((set) => ({
    tasks: columnsFromBackend,
    handleDragEnd: (result, columns) => {
        if (!result.destination) return;
        const { source, destination } = result;

        if (source.droppableId !== destination.droppableId) {
            const sourceColumn = columns[source.droppableId as keyof typeof columns];
            const destColumn = columns[destination.droppableId as keyof typeof columns];
            const sourceTasks = [...sourceColumn.items];
            const destTasks = [...destColumn.items];
            const [removed] = sourceTasks.splice(source.index, 1);
            const movedTask = { ...removed, showDiscription: !removed.showDiscription };

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
    handleEditTask: (taskId, taskTitle, taskDescription) => {
        const column = columnsFromBackend["tasks"];
        const copiedTasks = [...column.items];
        const taskIndex = copiedTasks.findIndex((task) => task.id === taskId);
        copiedTasks[taskIndex].title = taskTitle;
        copiedTasks[taskIndex].description = taskDescription;
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
}));