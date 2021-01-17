import React from 'react';
import Header from '../Header';
import { connect } from 'react-redux';
import { HashLink } from 'react-router-hash-link';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import ImageUploading from 'react-images-uploading';
import _ from 'lodash';
import Footer from '../Footer'
import {uploadUserAvatarRequest} from '../../api/user'


class Account extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            openAvatarDialogWindow: false,
            isImageUploaded: '',
            avatarImageURL: null,
            openLogOutDialogWindow: false
        }
    }

    getUserInitials = () => {
        const firstAndSecondNames = this.props.fullname ? this.props.fullname.split(' ') : [];
        return (firstAndSecondNames && firstAndSecondNames.length) ? firstAndSecondNames[0].charAt(0) + firstAndSecondNames[1].charAt(0) : null;
    }

    openChangeAvatarDialogWindow = () => {this.setState({...this.state, openAvatarDialogWindow: true})}

    handleCloseDialogWindow = (prop) => () => {this.setState({...this.state, [prop]: false})}

    handleUploadImage = (uploadedImage) => this.setState({...this.state, 
        avatarImageURL: uploadedImage[0].dataURL, 
        isImageUploaded: true});

    handleSaveChangedAvatar = () => {
        this.setState({...this.state, openAvatarDialogWindow: false})

        const formData = new FormData();

        formData.append("image", this.state.avatarImageURL);
        formData.append("username", this.props.username);

        uploadUserAvatarRequest(this.props.userId, formData)
        .then(async response => 
            {
                console.log(response.message)
            }
        )
        .catch((error) => 
            {
               console.log(error.response)
            }
        )
    };

    onError = () => {this.setState({...this.state, isImageUploaded: false})};

    handleLogOutButton = () => {this.setState({...this.state, openLogOutDialogWindow: true})};
    
    logOut = () => {
        this.setState({...this.state, openLogOutDialogWindow: false})
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('accessToken');
        window.location.reload('');
    }

    render(){

        const styles = {
            linkStyle: {
                color: 'rgb(71, 71, 71)',
                fontFamily: 'system-ui',
                fontSize: 'large'
            },

            textField: {
                width: '100%',
                marginTop: '1rem',
                textAligne: 'center',
                fontSize: 'small',
                display: 'flex'
            },
        }

        const {isImageUploaded, openLogOutDialogWindow} = this.state;

        const titleErrorStyle = (isImageUploaded || _.isEmpty(isImageUploaded)) ? {
            display: 'none'
        } : {
            display: 'flex'
        }

        return( 
            <div style={{minWidth: '600px', width: '100%'}}>
                <Header/>
                <div className='account-body-container'>
                    <div className='user-info-pane-container'>
                        <div className='right-img-container'>
                            <img src={require('./images/bg.svg').default} alt={'background'}/>
                        </div>
                        <div className='user-info-and-links-container'>
                            <div className='user-info'>
                                <Avatar
                                    src={this.state.avatarImageURL}
                                    alt='userIcon'
                                    style={{
                                        height: '45px',
                                        width: '45px',
                                        backgroundColor: 'rgb(201, 97, 221)',
                                        marginTop: '-0.2rem',
                                        fontSize: 'x-large'
                                    }} 
                                    >   
                                        {this.getUserInitials()}
                                </Avatar>
                                <div className='user-fullname-container'>
                                    <h3>{ this.props.fullname }</h3>
                                </div>
                                <div className='username-container'>
                                    <p>@{this.props.username}</p>
                                </div>
                            </div>

                            <div className='account-navigation-pane'>
                                <div className='link-container'>
                                    <HashLink 
                                        to='/account#personal-data'
                                        style={styles.linkStyle}
                                        
                                        >
                                            Personal data
                                    </HashLink>
                                </div>
                                <div className='link-container'>
                                    <HashLink 
                                        to='/account#security'
                                        style={styles.linkStyle}
                                        >
                                            Security
                                    </HashLink>
                                </div>
                                <div className='link-container'>
                                    <button 
                                        to='/account#log-out'
                                        style={styles.linkStyle}
                                        onClick={this.handleLogOutButton}
                                        >
                                            Log out
                                    </button>

                                    <Dialog 
                                    open={openLogOutDialogWindow}
                                    onClose={this.handleCloseDialogWindow('openLogOutDialogWindow')} 
                                    aria-labelledby='form-dialog-title'>
                                    <DialogTitle>Log out</DialogTitle>

                                    <DialogContent>
                                        <DialogContentText style={{color: 'rgb(71, 71, 71)'}}>
                                            Are you sure you want to log out?
                                        </DialogContentText>
                                
                                    </DialogContent>
                                    <DialogActions>
                                        <Button 
                                            onClick={this.logOut} 
                                            color='primary'>
                                            Yes
                                        </Button>
                                        <Button 
                                            onClick={this.handleCloseDialogWindow('openLogOutDialogWindow')} 
                                            color='primary'>
                                            No
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                                </div>
                            </div>
                        </div>
                        <div className='left-img-container'>
                            <img src={require('./images/bg.svg').default} alt={'background'}/>
                        </div>
                    </div>
                    <div className='personal-data-container' id='personal-data'>
                       <div className='title'>
                           <h2>Personal data</h2>
                       </div>
                        <div className='change-personal-data-container'>
                                <div className='text-fields-container'>
                                    <TextField
                                        variant='outlined'
                                        size='small'
                                        label='Full name'
                                        defaultValue={this.props.fullname}
                                        style={styles.textField}
                                    />

                                    <TextField
                                        variant='outlined'
                                        size='small'
                                        label='Username'
                                        defaultValue={this.props.username}
                                        style={styles.textField}
                                    />

                                    <TextField
                                        variant='outlined'
                                        size='small'
                                        label='email'
                                        defaultValue={this.props.email}
                                        style={styles.textField}
                                    />

                                    <TextField
                                        variant='outlined'
                                        size='small'
                                        label='Organization'
                                        defaultValue={this.props.organization}
                                        style={styles.textField}
                                    />

                                    <TextField
                                        variant='outlined'
                                        size='small'
                                        multiline
                                        label='About yourself'
                                        style={styles.textField}
                                    />
                            </div>

                            <div className='avatar-container'>
                                <button 
                                    className='change-avatar-button'
                                    onClick={this.openChangeAvatarDialogWindow}>
                                    <p>Avatar</p>

                                    <Avatar
                                        src={this.state.avatarImageURL}
                                        alt='userIcon'
                                        style={{
                                            height: '8rem',
                                            width: '8rem',
                                            backgroundColor: 'rgb(201, 97, 221)',
                                            fontSize: 'xxx-large',
                                            marginTop: '0.25rem',
                                        }} 
                                    >   
                                        {this.getUserInitials()}
                                    </Avatar>

                                    <div className='half-round-div'>
                                        <p>Change</p>
                                    </div>
                                </button>

                                <Dialog 
                                    open={this.state.openAvatarDialogWindow}
                                    onClose={this.handleCloseDialogWindow('openAvatarDialogWindow')} 
                                    aria-labelledby='form-dialog-title'>
                                    <DialogTitle>Change your avatar</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText style={{color: 'rgb(71, 71, 71)'}}>
                                            You can upload your image or select initials(without avatar).
                                        </DialogContentText>

                                        <div className='subscribe-chekbox'>
                                            <input
                                                type='checkbox' 
                                                className='subscribe'
                                            />
                                            <label style={{color: 'rgb(71, 71, 71)'}}>
                                                &nbsp;Initials(without avatar)
                                            </label> 
                                        </div>
                                        
                                        <ImageUploading
                                            isClearable
                                            onChange={this.handleUploadImage}
                                            acceptType={['jpg', 'gif', 'png', 'jpeg']}
                                            maxFileSize={5242880}
                                            onError={this.onError}
                                            >
                                            {({onImageUpload}) => {
                                                return(
                                                        <button 
                                                        onClick={onImageUpload}
                                                        className='upload-image' 
                                                        > 
                                                            <p>Upload image</p>
                                                        </button>
                                                )
                                            }}
                                        </ImageUploading>

                                        <DialogContentText style={{color: 'indianred'}}>
                                            <label 
                                                style={titleErrorStyle}>
                                                *Problems with uploading the image check that it has 
                                                the correct resolution '.jpg', '.gif', '.png', 'jpeg'
                                            </label>
                                        </DialogContentText>
                                    
                                    </DialogContent>
                                    <DialogActions>
                                        <Button 
                                            onClick={this.handleSaveChangedAvatar} 
                                            color='primary'>
                                            Save changes
                                        </Button>
                                        <Button onClick={this.handleCloseDialogWindow('openAvatarDialogWindow')} color='primary'>
                                            Close
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </div>
                        </div>
                       
                        <div className='save-changes-button-container'>
                           <button>
                               Save changes
                           </button>
                        </div>
                   </div>
                   
                   <div className='security-container' id='security'>
                       <div className='title'>
                           <h2>Security</h2>
                           <div className='change-password-container'>
                                <p>Change your password</p>
                                <TextField
                                    variant='outlined'
                                    size='small'
                                    label='Old password'
                                    style={styles.textField}
                                />

                                <TextField
                                    variant='outlined'
                                    size='small'
                                    label='New password'
                                    style={styles.textField}
                                />

                                <TextField
                                    variant='outlined'
                                    size='small'
                                    label='Enter again new password'
                                    style={styles.textField}
                                />

                                <div className='save-changes-button-container'>
                                    <button className='change-password-button'>
                                        Change password
                                    </button>
                                </div>
                           </div>

                           <div className='verify-email-container'>
                                <p>Verify your email</p>

                                <div>
                                    <TextField
                                        variant='outlined'
                                        size='small'
                                        label='email'
                                        defaultValue={this.props.email}
                                        style={styles.textField}
                                    />

                                    <div className='verify-button-container'>
                                        <button className='verify-button'>
                                            Verify
                                        </button>
                                    </div>
                                </div>
                                 
                           </div>
                       </div>
                   </div>
                </div>
                <Footer/>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
       username: state.user.username,
       fullname: state.user.fullName,
       email: state.user.email,
       organization: state.user.organization,
       image: state.user.userIcon,
       userId: state.user.userId 
    };
}

export default connect(mapStateToProps,{})(Account);