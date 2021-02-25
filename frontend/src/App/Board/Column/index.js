import React from 'react';
import Task from './Task';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import AddNewTask from './AddNewTask';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

class Column extends React.Component{
    constructor(props){
        super(props);

        this.wrapperRef = React.createRef();

        this.state={
            columnName: this.props.column.name,
            isOpenTitleInput: false,
            deleteColumnDialogWindow: false
        }
    }

    handleDeleteColumnDialogWindowState = () => {
        this.setState({...this.state, deleteColumnDialogWindow: !this.state.deleteColumnDialogWindow})
    }
    
    deleteColumn = () => {
        this.props.deleteColumn(this.props.column.id);
        setTimeout(this.handleDeleteColumnDialogWindowState, 1000);
    }

    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            const name = {
                name: this.state.columnName
            }

            this.props.changeColumnTitle(name, this.props.column.id);

            this.setState({
                ...this.state, 
                isOpenTitleInput: false
            })
        }
    }

    handleChangeTaskTitle = (event) => {
        this.setState({
            ...this.state, 
            columnName: event.target.value})
    }

    openTaskTitleEditPane = () => {
        this.setState({
            ...this.state, 
            isOpenTitleInput: !this.state.isOpenTitleInput})
    }

    componentDidMount(){
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside = (event) => {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target) && this.state.isOpenTitleInput) {
            const name = {
                name: this.state.columnName
            }

            this.props.changeColumnTitle(name, this.props.column.id);

            this.setState({
                ...this.state, 
                isOpenTitleInput: false
            })
        }
    };

    render(){
        const {column, tasks} = this.props;

        const {isOpenTitleInput, columnName, deleteColumnDialogWindow}=this.state;

        const styles = {
            titleStyle: isOpenTitleInput ? {
                display: 'none'
            } : {
                display: 'flex',
                width: '100%'
            },

            inputPropsTitleStyle : {
                fontFamily: 'Impact, Haettenschweiler, Arial Narrow Bold, sans-serif',
                fontSize: 'larger',
                color: '#212529',
                fontWeight: 'bolder',
            },

            inputTitleStyle: {
                display: isOpenTitleInput ? 'inline' : 'none',
                marginTop: '8px',
                marginLeft: '8px',
                backgroundColor: 'white',
            },
        }
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
                                    style={styles.titleStyle}
                                    onClick={this.openTaskTitleEditPane}
                                    >
                                    {columnName}
                                </h5>

                                <TextField
                                    variant='outlined'
                                    fullWidth
                                    value={this.state.columnName}
                                    size="small"
                                    margin="dense"
                                    multiline
                                    autoFocus
                                    onChange={this.handleChangeTaskTitle}
                                    inputProps={{style: styles.inputPropsTitleStyle}}
                                    style={styles.inputTitleStyle}
                                    onKeyDown={this.handleKeyDown}
                                    inputRef={this.wrapperRef} 
                                />

                                <div className='delete-column-container'>
                                    <IconButton style={{
                                        marginRight: '5px',
                                        marginTop: '5px',
                                        padding: '8px',
                                        }}
                                        onClick={this.handleDeleteColumnDialogWindowState}
                                    >
                                        <DeleteForeverRoundedIcon style={{fontSize: 'large'}}/>
                                    </IconButton>
                                </div>
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

                        <Dialog 
                            open={deleteColumnDialogWindow}
                            onClose={this.handleDeleteColumnDialogWindowState} 
                            aria-labelledby='form-dialog-title'>
                            <DialogTitle>
                                <h3 style={{
                                        textAlign: 'center'
                                    }}
                                >
                                    Deleting a column
                                </h3>
                            </DialogTitle>

                            <DialogContent>
                                <DialogContentText 
                                    style={{
                                        fontFamily: 'Impact, Haettenschweiler, Arial Narrow Bold, sans-serif',
                                        color: 'rgba(0, 0, 0, 0.87)',
                                    }}>
                                    Are you sure you want to delete the column "{column.name}"?
                                </DialogContentText>
                        
                            </DialogContent>
                            <DialogActions>
                                <Button 
                                    onClick={this.deleteColumn}
                                    color='primary'
                                >
                                    Yes
                                </Button>
                                <Button 
                                    onClick={this.handleDeleteColumnDialogWindowState}
                                    color='primary' 
                                >
                                    No
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                )}
            </Draggable>
        )
    }
}

export default Column;