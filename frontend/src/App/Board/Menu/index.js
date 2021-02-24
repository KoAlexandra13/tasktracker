import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import _ from 'lodash';


class Menu extends React.Component{

    closeDialogWindow = () => {
        this.props.handleCloseMenuDialogWindow('isOpenMenuDialogWindow');
    }

    render() {
        
        const {openMenuDialogWindow} = this.props;

        const styles = {
            buttonStyle: {
                marginLeft: '10px',
                marginTop: '-3px'
            }
        }

        return (
            <Dialog 
                open={openMenuDialogWindow}
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
                       <div className='menu-title-container'>
                            <h5 className='title'>
                                Menu
                            </h5>
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

                    
                </DialogContent>
            </Dialog>
        )
    }
}

export default Menu;