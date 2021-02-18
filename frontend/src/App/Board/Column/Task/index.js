import React from 'react'
import { Draggable } from 'react-beautiful-dnd';
import TaskEditPane from './TaskEditPane';
import _ from 'lodash'

class Task extends React.Component{
    constructor(props){
        super(props);

        this.labelColors = [
            { green: '#67c854' }, 
            { yellow: '#fbe729' }, 
            { orange: '#f1793a' }, 
            { red: '#ff4545' }
        ];

        this.state = {
            isOpenDialogWindow: false,
            labelColor: this.selectLabelColor()
        }
    }

    handleClickOnTask = () => {
        this.setState({...this.state, isOpenDialogWindow: !this.state.isOpenDialogWindow})
    }

    handleCloseDialogWindow = (prop) => {
        this.setState({...this.state, [prop]: false, labelColor: this.selectLabelColor()})
    }

    selectLabelColor = () => {
        const color = this.labelColors.find(color => Object.keys(color)[0] === this.props.task.label);
        return _.isUndefined(color) ? null : Object.values(color)[0];
    }


    render(){

        const {task, index, columnId} = this.props;

        const {isOpenDialogWindow, labelColor} = this.state;

        const labelStyle = _.isNull(task.label) ? {
            display: 'none',
        } : {
            backgroundColor: `${labelColor}`
        }

        return (
            <div>
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
                            <div 
                                className='task-label'
                                style={labelStyle}/>
                            {task.name}
                        </div>
                    )}
                </Draggable>

                <TaskEditPane 
                    openDialogWindow={isOpenDialogWindow} 
                    handleCloseDialogWindow={this.handleCloseDialogWindow}
                    task={task}
                    columnId={columnId}
                />
            </div>
        );
    }
}

export default Task;