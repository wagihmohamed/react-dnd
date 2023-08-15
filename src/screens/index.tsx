import { Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { shallow } from "zustand/shallow";
// import { AppContainer, Container, TaskItem, TaskList } from "../components";
import { AppContainer, Container, TaskList } from "../components/Styled";
import { TaskItem } from "../components/TaskItem";
import { useTasksStore } from "../store/tasksStore";

export const HomeScreen = () => {
  const { tasks, handleDragEnd } = useTasksStore(
    (state) => ({
      tasks: state.tasks,
      handleDragEnd: state.handleDragEnd,
    }),

    shallow
  );

  //   const tasks = useTasksStore((state) => state.tasks);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <AppContainer>
      <Container gap={10}>
        <DragDropContext onDragEnd={(result) => handleDragEnd(result, tasks)}>
          <Container gap={20}>
            {Object.entries(tasks).map(([columnId, column], index) => {
              return (
                <Paper
                  key={columnId}
                  //   pt="2.3rem"
                  //   pl="1.2rem"
                  //   pr="1rem"
                  //   flex={index === 0 ? 1 : 0}
                  sx={{
                    pt: 2,
                    pl: 1.2,
                    pr: 1,
                    flex: index === 0 ? 1 : 0,
                  }}
                >
                  {isMounted ? (
                    <Droppable droppableId={columnId}>
                      {(provided) => (
                        <TaskList
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                        >
                          {column.items.map((item, index) => (
                            <TaskItem key={item.id} task={item} index={index} />
                          ))}
                          {provided.placeholder}
                        </TaskList>
                      )}
                    </Droppable>
                  ) : null}
                </Paper>
              );
            })}
          </Container>
        </DragDropContext>
      </Container>
    </AppContainer>
  );
};
