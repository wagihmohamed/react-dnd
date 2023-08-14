import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { AppContainer, TaskItem, Container, Column, TaskList } from '../components';
import { useTasksStore } from '../store/tasksStore';

export const HomeScreen = () => {
    const { tasks, handleDragEnd } = useTasksStore();

    return (
        <AppContainer>
            <Container gap={10}>
                <DragDropContext
                    onDragEnd={(result) => handleDragEnd(result, tasks)}
                >
                    <Container gap={20}>
                        {Object.entries(tasks).map(([columnId, column], index) => {
                            return (
                                <Column
                                    key={columnId}
                                    paddingTop='2.3rem'
                                    paddingLeft="1.2rem"
                                    paddingRight="1rem"
                                    flex={index === 0 ? 1 : 0}
                                >

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
                                </Column>
                            );
                        })}
                    </Container>
                </DragDropContext>
            </Container>
        </AppContainer>
    );
};