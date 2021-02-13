import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';

class TaskEditPane extends React.Component{

    handleCloseDialogWindow = (prop) => () => {this.setState({...this.state, [prop]: false})}

    render(){
        const {openDialogWindow, task} = this.props;

        return(
            <Dialog 
                open={openDialogWindow}
                onClose={this.props.handleCloseDialogWindow('openLogOutDialogWindow')} 
                aria-labelledby='form-dialog-title'>
                <DialogTitle>{task.name}</DialogTitle>
                <DialogActions>
                    <Button 
                        onClick={this.handleCloseDialogWindow('openLogOutDialogWindow')} 
                        >
                        <CloseIcon/>
                    </Button>
                </DialogActions>

                <DialogContent>

            
                </DialogContent>
               
            </Dialog>
        )
    }
}

export default TaskEditPane;