import { FC } from "react";
import { Task } from "../../models";
import { TaskItemContainer, TaskItemTitle } from "../Styled";

interface TaskItemProps {
    task: Omit<Task, 'description'>;
}

export const FinishedTaskItem: FC<TaskItemProps> = ({ task }) => {
    return (
        <TaskItemContainer alignItems="center" justifyContent="center">
            <TaskItemTitle>{task.title}</TaskItemTitle>
        </TaskItemContainer >
    )
}
