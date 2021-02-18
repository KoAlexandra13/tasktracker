import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import {connect} from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import SubjectIcon from '@material-ui/icons/Subject';
import WebIcon from '@material-ui/icons/Web';
import AddPhotoAlternateRoundedIcon from '@material-ui/icons/AddPhotoAlternateRounded';
import LabelImportantRoundedIcon from '@material-ui/icons/LabelImportantRounded';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import ScheduleRoundedIcon from '@material-ui/icons/ScheduleRounded';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import {changeBoardTask} from '../../../../../actions/board';
import _ from 'lodash';
import {deleteTask} from '../../../../../actions/board';

class TaskEditPane extends React.Component{
    constructor(props){
        super(props)

        this.labelColors = [
            { green: '#67c854' }, 
            { yellow: '#fbe729' }, 
            { orange: '#f1793a' }, 
            { red: '#ff4545' }
        ];

        this.state = {
            isOpenTitleInput: false,
            taskName: this.props.task.name,
            taskDescription: this.props.task.description,
            deadline: this.props.task.deadline ? this.props.task.deadline.slice(0, -4) : null,
            active: this.handleSelectLabel(this.props.task.label),
        }
    }

    handleSelectLabel = (label) => {
        if(_.isNull(label)){
            return Array(4).fill(false);
        }
        else {
            const labelsArray = Array(4).fill(false);
            this.labelColors.forEach((value, index) => {
                if(Object.keys(value)[0] === label){
                    labelsArray[index] = true;
                }
            })
            return labelsArray;
        }
    }
    
    handleChangeTaskTitle = (event) => {
        this.setState({
            ...this.state, 
            taskName: event.target.value})
    }

    handleChangeTaskDescription = (event) => {
        this.setState({
            ...this.state, 
            taskDescription: event.target.value})
    }

    openTaskTitleEditPane = () => {
        this.setState({
            ...this.state, 
            isOpenTitleInput: !this.state.isOpenTitleInput})
    }

    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.setState({
                ...this.state, 
                isOpenTitleInput: false})

            const name = { 
                name: this.state.taskName
            }
    
            this.props.changeBoardTask(name, this.props.task.id);
        }
    }

    saveDescription = () => {
        const description = { 
            description: this.state.description 
        }

        this.props.changeBoardTask(description, this.props.task.id);
    }

    saveDeadline = () => {
        const deadline = { 
            deadline: this.state.deadline 
        }

        this.props.changeBoardTask(deadline, this.props.task.id);
    }

    handleChangeTaskDeadline = (event) => {
        this.setState({
            ...this.state, 
            deadline: event.target.value})
    }

    closeDialogWindow = () => {
        this.props.handleCloseDialogWindow('isOpenDialogWindow');
        this.setState({
            ...this.state, 
            isOpenTitleInput: false, 
            taskName: this.props.task.name,
            taskDescription: this.props.task.description,
            deadline: this.props.task.deadline ? this.props.task.deadline.slice(0, -4) : null,
        });
    }

    handleClickOnLabel = (index) => {
        const newArray = Array.from(this.state.active);
        newArray.fill(false);
        let labelColor = null;

        if(this.state.active[index] === true){
            this.setState({...this.state, active: newArray});
        }
        else{
            newArray[index] = true;
            this.setState({...this.state, active: newArray});
            labelColor = Object.keys(this.labelColors[index])[0];
        }
        const label = {
            label: labelColor
        }

        this.props.changeBoardTask(label, this.props.task.id);
    }

    deleteTask = () => {
        this.props.deleteTask(this.props.task.id);
        this.props.handleCloseDialogWindow('isOpenDialogWindow');
    }

    render(){
        const {openDialogWindow} = this.props;

        const {isOpenTitleInput, taskDescription} = this.state;

        const styles = {
            titleStyle: isOpenTitleInput ? {
                display: 'none'
            } : {
                display: 'flex'
            },

            inputPropsTitleStyle : {
                fontFamily: 'Impact, Haettenschweiler, Arial Narrow Bold, sans-serif',
                fontSize: 'x-large',
                color: '#39444a',
                fontWeight: 'bolder'
            },

            inputTitleStyle: {
                display: isOpenTitleInput ? 'inline' : 'none',
                marginTop: '5px',
                marginLeft: '8px',
            },

            buttonStyle: {
                marginLeft: '10px',
                marginTop: '-3px'
            }
        }

        return(
            <Dialog 
                open={openDialogWindow}
                scroll='paper'
                onClose={this.closeDialogWindow} 
                fullWidth={true}
                aria-labelledby='form-dialog-title'>
                <DialogContent style={{paddingTop: '12px', paddingRight: '8px'}}>
                    <div style={{
                            display: 'inline-flex',
                            justifyContent: 'space-between',
                            width: '100%',   
                        }}
                    >
                       <div className='edit-task-name-container'>
                            <WebIcon style={{marginTop: '8px', color: '#4c5b64'}}/>
                            <h5 
                                className='task-name'
                                style={styles.titleStyle}
                                onClick={this.openTaskTitleEditPane}
                            >
                                {this.state.taskName}
                            </h5>
                            <TextField
                                variant='outlined'
                                fullWidth
                                value={this.state.taskName}
                                size="small"
                                margin="dense"
                                multiline
                                autoFocus
                                onChange={this.handleChangeTaskTitle}
                                inputProps={{style: styles.inputPropsTitleStyle}}
                                style={styles.inputTitleStyle}
                                onKeyDown={this.handleKeyDown} 
                            />
                        </div>
                        <DialogActions style={{padding: 0}}>
                            <IconButton
                                style={styles.buttonStyle}
                                onClick={this.closeDialogWindow} 
                            >
                                <CloseIcon style={{color: '#374a56'}}/>
                            </IconButton>
                        </DialogActions>
                    </div>

                    <span>
                        <p className='help'>*press "Enter" to save the changed card name</p>
                    </span>

                    <div className='task-description-container'>
                        <div className='task-description-title'>
                            <SubjectIcon style={{color: '#4c5b64'}}/>
                            <h5>Description</h5>
                        </div>

                        <div className='description-text-container'>
                            <TextField
                                variant='outlined'
                                fullWidth
                                value={taskDescription}
                                placeholder={'Add a more detailed description of the card...'}
                                multiline
                                onChange={this.handleChangeTaskDescription}
                            /> 
                        </div>

                        <div className='button-container'>
                            <button 
                                className='save-description'
                                onClick={this.saveDescription}>
                                Save changes
                            </button>
                            <IconButton style={{marginTop: '-8px', marginRight: '12px'}}>
                                <AddPhotoAlternateRoundedIcon/>
                            </IconButton>
                        </div>                        
                    </div>

                    <div className='task-label-container'>
                        <div className='task-label-title'>
                            <LabelImportantRoundedIcon style={{color: '#4c5b64'}}/>
                            <h5>Labels</h5>
                        </div>

                        <div className='labels'>
                            {this.labelColors.map((value, index) => {
                                return (
                                    <button
                                        onClick={() => this.handleClickOnLabel(index)} 
                                        key={index} 
                                        className={`label`} 
                                        style={{backgroundColor: Object.values(value)[0]}}>
                                            <CheckRoundedIcon
                                                style={{visibility: 'hidden'}} 
                                                className={`${this.state.active[index] ? 'active' : ''}`}/>
                                        </button>)
                            })}
                        </div>
                    </div>

                    <div className='task-deadline-container'>
                        <div className='task-deadline-title'>
                            <ScheduleRoundedIcon style={{color: '#4c5b64'}}/>
                            <h5>Deadline</h5>
                        </div>

                        <div className='deadline-input-container'>
                            <input 
                                type="datetime-local"
                                value={this.state.deadline}
                                onChange={this.handleChangeTaskDeadline}
                            />
                        </div>

                        <button 
                            className='save-deadline'
                            onClick={this.saveDeadline}>
                                Save deadline
                        </button>
                    </div>

                    <div className='delete-button-container'>
                        <p> Delete task </p>
                        <IconButton style={{
                            marginTop: '-15px', 
                            marginRight: '12px', 
                            color: 'rgb(255, 69, 69)',
                            marginLeft: '12px',
                            marginBottom: '5px' 
                            }}
                            onClick={this.deleteTask}
                        >
                            <DeleteForeverRoundedIcon style={{color: 'rgb(255, 69, 69)'}}/>
                        </IconButton>
                    </div>
                </DialogContent>
            </Dialog>
        )
    }
}

export default connect(null,{
    changeBoardTask,
    deleteTask}
)(TaskEditPane);
