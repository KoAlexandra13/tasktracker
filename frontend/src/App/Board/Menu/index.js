import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import _ from 'lodash';
import ColorLensRoundedIcon from '@material-ui/icons/ColorLensRounded';
import PhotoLibraryRoundedIcon from '@material-ui/icons/PhotoLibraryRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';


class Menu extends React.Component{
    constructor(props){
        super(props)

        this.colors = ['#af704b5e', '#ff0c9747', '#9f00e654', '#8eeaf9', '#007bff5e', 
        '#1823ff5e', '#d7f3a5d1', '#ff260c78', '#ffc107', '#ff6a07', '#00a619a1',
        '#008aa6a1', '#007bff', '#001fa6a1', '#e60059db', '#e60024db'];

        this.images = this.getImages();
    }
    closeDialogWindow = () => {
        this.props.handleCloseMenuDialogWindow('isOpenMenuDialogWindow');
    }

    getImages = () => {
        let imageNumber = 1;
        let images = [];
        for(imageNumber; imageNumber <= 43; imageNumber++){
            images = images.concat(require(`./images/${imageNumber}.jpg`).default,);
        }
        return images;
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

                    <div className='board-colors-container'>
                        <div className='board-colors-title'>
                                <ColorLensRoundedIcon style={{color: '#4c5b64'}}/>
                                <h5>Select background color</h5>
                        </div>
                        <div className='colors-container'>
                            {this.colors.map(color => {
                                return (
                                    <div className='color'>
                                        <button style={{backgroundColor: color}}></button>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <div className='board-images-container'>
                        <div className='board-images-title'>
                                <PhotoLibraryRoundedIcon style={{color: '#4c5b64'}}/>
                                <h5>Select background image</h5>
                        </div>
                        <div className='images-container'>
                            {this.images.map(image => {
                                return (
                                    <div className='image'>
                                           <img src={image}/>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <div className='delete-board-container'>
                        <div className='delete-board-title'>
                                <DeleteRoundedIcon style={{color: '#4c5b64'}}/>
                                <h5>Delete this board</h5>
                        </div>

                        <div className='delete-warning'>
                            <p>If you click the delete button, the board is permanently deleted! 
                                Are you sure you want to delete this board?</p>
                        </div>

                        <div className='delete-board-button-container'>
                            <button>
                                <p>Delete board anyway</p>
                            </button>
                        </div>
                       
                    </div>


                </DialogContent>
            </Dialog>
        )
    }
}

export default Menu;