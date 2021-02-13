import React from 'react'
import { Draggable } from 'react-beautiful-dnd';
import TaskEditPane from './TaskEditPane'

class Task extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            isOpenDialogWindow: false
        }
    }

    handleClickOnTask = () => {
        this.setState({...this.state, isOpenDialogWindow: !this.state.isOpenDialogWindow})
    }

    handleCloseDialogWindow = (prop) => () => {this.setState({...this.state, [prop]: false})}


    render(){

        const {task, index} = this.props;

        const {isOpenDialogWindow} = this.state;

        return (
            <Draggable 
                key={task.id} 
                draggableId={`task-${task.id.toString()}`} 
                index={index}
            >
                {(provided)=> (
                    <div 
                        className='task-contianer'
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        onClick={this.handleClickOnTask}
                    >
                        {task.name}

                        <TaskEditPane 
                            openDialogWindow={isOpenDialogWindow} 
                            handleCloseDialogWindow={this.handleCloseDialogWindow}
                            task={task}/>
                    </div>
                )}
            </Draggable>
        );
    }
}

export default Task;