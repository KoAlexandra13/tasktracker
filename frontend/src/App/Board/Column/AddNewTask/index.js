import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import _ from 'lodash';
import {connect} from 'react-redux';
import {addNewTask} from '../../../../actions/board';

class AddNewTask extends React.Component{
    constructor(props){
        super(props);

        this.wrapperRef = React.createRef();

        this.state = {
            isInputPaneOpen: false,
            taskName: '',
            error: null
        }
    }

    componentDidMount(){
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside = (event) => {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target) && this.state.isInputPaneOpen) {
            this.setState({...this.state, isInputPaneOpen: false, taskName: ''})
        }
    };

    handleClickAddNewTask = () => {
        this.setState({...this.state, isInputPaneOpen: !this.state.isInputPaneOpen, taskName: ''});
    }

    clickAddNewColumnButton = () => {
        if(this.state.taskName){
            this.setState(
                {
                    ...this.state, 
                    error: null,
                    isInputPaneOpen: false 
                });

            const taskData = {
                name: this.state.taskName,
                column: this.props.columnId,
                index: this.props.index,
                description: ''
            }

            this.props.addNewTask(taskData)
        }
        else {
            this.setState(
                {
                    ...this.state,
                    error: 'First add the card name!'
                })
        }
    } 

    handleClickCloseButton = () => {
        this.setState({...this.state, isInputPaneOpen: false, taskName: '', error: null});
    }

    getTaskName = (event) => {
        this.setState({...this.state, taskName: event.target.value})
    }

    render() {

        const styles = {
            buttonStyle: this.state.isInputPaneOpen ? {
                display: 'none'
            } : {
                display: 'flex'
            },
            inputStyle: !this.state.isInputPaneOpen ? {
                display: 'none'
            } : {
                display: 'block'
            },
            errorStyle: _.isNull(this.state.error) ? {
                display: 'none',
            } : {
                display: 'block',
            }
        }

        return (
            <div className='add-new-task-container'>
                <div 
                    style={styles.buttonStyle}
                    className='add-new-task'>
                    <button
                        onClick={this.handleClickAddNewTask}>
                        <AddIcon style={{marginBottom: '4px'}}/>
                        &nbsp;Add one more card
                    </button>
                </div>

                <div 
                    style={styles.inputStyle} 
                    className='add-new-task-name'
                    ref={this.wrapperRef}
                >
                    <div className='input-container'>
                        <textarea
                            placeholder='Enter a task name...'
                            onChange={this.getTaskName}
                            value={this.state.taskName}
                        />

                            <span
                                style={styles.errorStyle}
                            >
                                {this.state.error}
                            </span>
                    </div>
                    <div className='options-button'>
                        <button 
                            onClick={this.clickAddNewColumnButton}
                            className='add-button'>
                            Add new card
                        </button>

                        <button 
                            onClick={this.handleClickCloseButton}
                            className='close-button'>
                            <CloseIcon style={{color: 'whitesmoke'}}/>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(null, {addNewTask})(AddNewTask);

