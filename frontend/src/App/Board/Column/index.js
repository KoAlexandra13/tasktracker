import React from 'react';
import Task from './Task';
import { Droppable, Draggable } from 'react-beautiful-dnd'

class Column extends React.Component{
    render(){
        const {column, tasks} = this.props;
        return(
            <Draggable draggableId={column.id.toString()} index={this.props.index}>
                {(provided) => (
                    <div 
                        className='column-container'
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        >
                        <h5 
                            {...provided.dragHandleProps}
                            className='column-title'
                            >
                            {column.name}
                        </h5>
                        <Droppable droppableId={column.id.toString()} type='task'>
                            {(provided) => (
                                <div 
                                    className='tasks-container' 
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                {tasks && tasks.map((task, index) => <Task key={task.id} task={task} index={index}/>)}
                                {provided.placeholder}
                            </div>
                            )}
                        </Droppable>
                    </div>
                )}
                
            </Draggable>
        )
    }
}

export default Column;