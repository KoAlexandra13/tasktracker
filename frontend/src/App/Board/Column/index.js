import React from 'react';
import Task from './Task';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import CreateRoundedIcon from '@material-ui/icons/CreateRounded';
import AddNewTask from './AddNewTask'

class Column extends React.Component{
    
    render(){
        const {column, tasks} = this.props;
        return(
            <Draggable 
                key={column.id} 
                draggableId={column.id.toString()} 
                index={this.props.index}
            >
                {(provided) => (
                    <div 
                        className='column-container'
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                    >
                        <div className="pb-2 title-container-general">
                            <div className='title-container'>
                                <h5 
                                    {...provided.dragHandleProps}
                                    className='title'
                                    >
                                    {column.name}
                                </h5>

                                <button
                                    className='edit-title'
                                    onClick={this.handleClickEditButton}>

                                    <CreateRoundedIcon style={{color: '#202223c7'}}/>

                                </button>
                            </div>

                            <Droppable 
                                droppableId={column.id.toString()} 
                                type='task'
                            >
                                {(provided) => (
                                    <div 
                                        className='tasks-container'
                                        style={{
                                            flexGrow: 1,
                                            minHeight: '25px'
                                        }} 
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                    {tasks && tasks.map((task, index) => <Task 
                                        key={task.id} 
                                        task={task} 
                                        index={index}
                                        columnId={column.id}/>)}
                                    {provided.placeholder}
                                </div>
                                )}
                            </Droppable>

                           <AddNewTask columnId={column.id} index={column.tasks.length}/>

                        </div>
                    </div>
                )}
                
            </Draggable>
        )
    }
}

export default Column;