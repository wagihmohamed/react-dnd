import { FC, useState } from "react";
import { Task } from "../../models";
import { Button, FormContainer, ModalContainer, TaskItemContainer, TaskItemDescription, TaskItemTitle, TextField } from "../Styled";
import { Draggable } from 'react-beautiful-dnd';
import { Modal } from "@mui/material";
import { useTasksStore } from "../../store/tasksStore";

interface TaskItemProps {
    task: Task;
    index: number;
}

export const TaskItem: FC<TaskItemProps> = ({ task, index }) => {
    const { handleEditTask } = useTasksStore();
    const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);

    const isItemEditable = task.showDiscription;

    const handleEditTaskModalOpen = () => {
        if (!isItemEditable) return;
        setIsEditTaskModalOpen(true);
    };

    const handleClose = () => {
        setIsEditTaskModalOpen(false);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleEditTask(task.id, title, description);
        setIsEditTaskModalOpen(false);
    }

    return (
        <>
            <Draggable draggableId={task.id} key={task.id} index={index}>
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        <TaskItemContainer onClick={handleEditTaskModalOpen}>
                            <TaskItemTitle cursor={`${isItemEditable && 'pointer'}`}>{task.title}</TaskItemTitle>
                            {isItemEditable && (
                                <TaskItemDescription>{task.description}</TaskItemDescription>
                            )}
                        </TaskItemContainer >
                    </div>
                )}
            </Draggable>
            <Modal
                open={isEditTaskModalOpen}
                onClose={handleClose}
            >
                <ModalContainer>
                    <FormContainer onSubmit={handleSubmit}>
                        <TextField
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <TextField
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <Button type="submit">Save</Button>
                    </FormContainer>
                </ModalContainer>
            </Modal>
        </>
    )
}
