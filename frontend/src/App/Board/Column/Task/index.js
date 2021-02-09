import React from 'react'
import { Draggable } from 'react-beautiful-dnd';

class Task extends React.Component{
    render(){

        const {task, index} = this.props;

        return (
            <Draggable 
                key={task.id} 
                draggableId={`task-${task.id.toString()}`} 
                index={index}
            >
                {(provided)=> (
                    <div className='task-contianer'
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        {task.name}
                    </div>

                )}
            </Draggable>
        );
    }
}

export default Task;