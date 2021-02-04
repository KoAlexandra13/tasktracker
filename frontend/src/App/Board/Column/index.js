import React from 'react';
import Task from './Task';
import { Droppable } from 'react-beautiful-dnd'

class Column extends React.Component{
    render(){
        const {column, tasks} = this.props;
        return(
            <div className='column-container'>
                <h5 className='column-title'>
                    {column.name}
                </h5>
                <Droppable droppableId={column.id.toString()}>
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
        )
    }
}

export default Column;