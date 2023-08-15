import { Modal } from "@mui/material";
import { FC, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Task } from "../../models";
import { useTasksStore } from "../../store/tasksStore";
import {
  FormContainer,
  ModalContainer,
  TaskItemContainer,
  TaskItemDescription,
  TaskItemTitle,
  TextField,
} from "../Styled";

interface TaskItemProps {
  task: Task;
  index: number;
}

export const TaskItem: FC<TaskItemProps> = ({ task, index }) => {
  const { onEdit } = useTasksStore();
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);

  const isItemEditable = task.showDescription;

  const handleEditTaskModalOpen = () => {
    if (!isItemEditable) return;
    setIsEditTaskModalOpen(true);
  };

  const handleClose = () => {
    setIsEditTaskModalOpen(false);
  };

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
              <TaskItemTitle cursor={`${isItemEditable && "pointer"}`}>
                {task.title}
              </TaskItemTitle>
              {isItemEditable && (
                <TaskItemDescription>{task.description}</TaskItemDescription>
              )}
            </TaskItemContainer>
          </div>
        )}
      </Draggable>
      <Modal open={isEditTaskModalOpen} onClose={handleClose}>
        <ModalContainer>
          <FormContainer>
            <TextField
              value={task.title}
              onChange={(e) => onEdit({ id: task.id, title: e.target.value })}
            />
            <TextField
              value={task.description}
              onChange={(e) =>
                onEdit({ id: task.id, description: e.target.value })
              }
            />
          </FormContainer>
        </ModalContainer>
      </Modal>
    </>
  );
};
