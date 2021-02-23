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
import Footer from '../Footer'
import { uploadUserAvatarRequest, changeUserInfoRequest } from '../../api/user'
import { uploadAvatarImage, changeUserInfo } from '../../actions/user';


class Account extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            openAvatarDialogWindow: false,
            isImageUploaded: '',
            avatarImageFile: null,
            avatarImageURL: null,
            openLogOutDialogWindow: false,
            isCheckedInitialsCheckbox : false,
            newFullname: this.props.fullname,
            newUsername: this.props.username, 
            newOrganization: this.props.organization,
            newEmail: this.props.email,
            newUserInfoAboutYourself: this.props.userInfoAboutYourself,
            personalDataErrors: {},
            changePasswordErrors: {},
        }
    }

    getUserInitials = () => {
        const firstAndSecondNames = this.props.fullname ? this.props.fullname.split(' ') : [];
        return (firstAndSecondNames && firstAndSecondNames.length) ? firstAndSecondNames[0].charAt(0) + firstAndSecondNames[1].charAt(0) : null;
    }

    openChangeAvatarDialogWindow = () => {this.setState({...this.state, openAvatarDialogWindow: true})}

    handleCloseDialogWindow = (prop) => () => {this.setState({...this.state, [prop]: false})}

    handleUploadImage = (uploadedImage) => {
        this.setState(
            {
                ...this.state, 
                avatarImageFile: uploadedImage[0].file,
                avatarImageURL: uploadedImage[0].dataURL,
                isImageUploaded: true,
                isCheckedInitialsCheckbox : false
            }
        );
    }

    handleSaveChangedAvatar = () => {
        this.setState({...this.state, openAvatarDialogWindow: false})
        const image = !this.state.isCheckedInitialsCheckbox ? this.state.avatarImageFile : null;
        
        let data = null;
        if (image){
            data = new FormData();
            data.append("image", image);
        } else {
            data = {
                image: image
            };
        }

        uploadUserAvatarRequest(this.props.userId, data)
        .then(response => 
            {
                this.props.uploadAvatarImage(response.data.image)
            }
        )
        .catch((error) => 
            {
                console.log(error.response)
            }
        )
    };

    handleSaveChangedUserInfo = () => {
        let data = new FormData();

        if(this.state.newFullname !== this.props.fullname){
            data.append("fullname", this.state.newFullname)
        }

        if(this.state.newUsername !== this.props.username){ 
            data.append("username", this.state.newUsername)
        }

        if(this.state.newEmail !== this.props.email){ 
            data.append("email", this.state.newEmail)
        }

        if(this.state.newOrganization !== this.props.organization){ 
            data.append("organization", this.state.newOrganization)
        }

        if(this.state.newUserInfoAboutYourself !== this.props.userInfoAboutYourself){
            data.append("about", this.state.newUserInfoAboutYourself);
        }

        changeUserInfoRequest(this.props.userId, data)
        .then(response => 
            {
                this.props.changeUserInfo(response.data)
                this.setState({personalDataErrors: {}});
            }
        )
        .catch((error) => 
            {
                this.setState({personalDataErrors: error.response.data});
            }
        )
    }

    onError = () => {this.setState({...this.state, isImageUploaded: false})};

    handleLogOutButton = () => {this.setState({...this.state, openLogOutDialogWindow: true})};
    
    logOut = () => {
        this.setState({...this.state, openLogOutDialogWindow: false})
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('accessToken');
        window.location.reload('');
    }

    selectInitials = () => {
        this.setState(
            {
                ...this.state, 
                isCheckedInitialsCheckbox: !this.state.isCheckedInitialsCheckbox
            }
        )
    };

    handleChangeTextField = (prop, value) => {
        this.setState({...this.state, [prop]: value})
    }

    render(){

        const styles = {
            linkStyle: {
                color: 'rgb(71, 71, 71)',
                fontFamily: 'Impact, Haettenschweiler, Arial Narrow Bold, sans-serif',
                fontSize: 'large',
            },

            textField: {
                width: '100%',
                marginTop: '1rem',
                textAligne: 'center',
                fontSize: 'small',
                display: 'flex'
            },
        }

        const {openLogOutDialogWindow, personalDataErrors} = this.state;

        const titlePersonalDataErrorsStyle = Object.values(personalDataErrors).some((value) => value !== null ) ? {
            display: 'flex',
            color: 'indianred',
            fontSize: 'small',
            marginBottom: '-1.5rem',
            marginTop: '0.25rem'
        } : {
            display: 'none'
        };

        return( 
            <div style={{width: '100%'}}>
                <Header/>
                <div className='account-body-container'>
                    <div className='user-info-pane-container'>
                        <div className='right-img-container'>
                            <img 
                                className='d-none'
                                src={require('./images/bg.svg').default} alt={'background'}/>
                        </div>
                        <div className='user-info-and-links-container'>
                            <div className='user-info'>
                                <Avatar
                                    src={this.props.image}
                                    alt='userIcon'
                                    style={{
                                        height: '45px',
                                        width: '45px',
                                        backgroundColor: 'rgb(201, 97, 221)',
                                        marginTop: '-0.2rem',
                                        fontSize: 'x-large',
                                        fontFamily: 'Impact, Haettenschweiler, Arial Narrow Bold, sans-serif'
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
                                        className='p-0 hover-underline'
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
                                                color='#374549'>
                                                Yes
                                            </Button>
                                            <Button 
                                                onClick={this.handleCloseDialogWindow('openLogOutDialogWindow')} 
                                                color='#374549'>
                                                No
                                            </Button>
                                        </DialogActions>
                                    </Dialog>
                                </div>
                            </div>
                        </div>
                        <div className='left-img-container'>
                            <img
                                className='d-none' 
                                src={require('./images/bg.svg').default} alt={'background'}/>
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
                                        onChange={(e) => this.handleChangeTextField('newFullname', e.target.value)}
                                    />

                                    <TextField
                                        variant='outlined'
                                        size='small'
                                        label='Username'
                                        defaultValue={this.props.username}
                                        style={styles.textField}
                                        onChange={(e) => this.handleChangeTextField('newUsername', e.target.value)}
                                    />

                                    <TextField
                                        variant='outlined'
                                        size='small'
                                        label='Email'
                                        defaultValue={this.props.email}
                                        style={styles.textField}
                                        onChange={(e) => this.handleChangeTextField('newEmail',e.target.value)}
                                    />

                                    <TextField
                                        variant='outlined'
                                        size='small'
                                        label='Organization'
                                        defaultValue={this.props.organization}
                                        style={styles.textField}
                                        onChange={(e) => this.handleChangeTextField('newOrganization',e.target.value)}
                                    />

                                    <TextField
                                        variant='outlined'
                                        size='small'
                                        multiline
                                        label='About yourself'
                                        defaultValue={this.props.userInfoAboutYourself}
                                        style={styles.textField}
                                        onChange={(e) => this.handleChangeTextField('newUserInfoAboutYourself',e.target.value)}

                                    />
                            </div>

                            <div className='avatar-container'>
                                <button 
                                    className='change-avatar-button'
                                    onClick={this.openChangeAvatarDialogWindow}>
                                    <p className='h4'>Avatar</p>
                                    <Avatar
                                        src={this.props.image}
                                        alt='userIcon'
                                        style={{
                                            height: '8rem',
                                            width: '8rem',
                                            backgroundColor: 'rgb(201, 97, 221)',
                                            fontSize: 'xxx-large',
                                            marginTop: '0.25rem',
                                            fontFamily: 'Impact, Haettenschweiler, Arial Narrow Bold, sans-serif'
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
                                    <DialogTitle>
                                        Change your avatar
                                        </DialogTitle>
                                    <DialogContent>
                                        <DialogContentText style={{color: 'rgb(71, 71, 71)'}}>
                                            You can upload your image or select your initials.
                                        </DialogContentText>

                                        <div 
                                            style={{display : 'flex'}}
                                        >
                                            <div className='avatarDemo'>
                                                <Avatar
                                                    src={this.state.avatarImageURL || this.props.image }
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
                                            </div>
                                            
                                            <div 
                                                style={{
                                                        width : '100%',
                                                        marginTop: '4rem',
                                                        marginLeft : '2rem'}}
                                            >
                                                <div className='subscribe-chekbox'>
                                                    <input
                                                        type='checkbox' 
                                                        className='subscribe'
                                                        onClick={this.selectInitials}
                                                        checked={this.state.isCheckedInitialsCheckbox}
                                                    />
                                                    <label style={{color: 'rgb(71, 71, 71)'}}>
                                                        &nbsp;Your initials (without avatar)
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
                                            </div>
                                        </div>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button 
                                            onClick={this.handleSaveChangedAvatar} 
                                            color='#374549'>
                                            Save changes
                                        </Button>
                                        <Button 
                                            onClick={this.handleCloseDialogWindow('openAvatarDialogWindow')} 
                                            color='#374549'>
                                            Close
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </div>
                        </div>

                        {
                            <span 
                                className='sign-up-form-error'
                                style={ titlePersonalDataErrorsStyle }>
                                    * {Object.values(personalDataErrors)[0]} 
                            </span>
                        }
                       
                        <div className='save-changes-button-container'>
                           <button
                                onClick={this.handleSaveChangedUserInfo}>
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
       userId: state.user.userId, 
       userInfoAboutYourself: state.user.userInfoAboutYourself
    };
}

export default connect(mapStateToProps,{
    uploadAvatarImage,
    changeUserInfo,
})(Account);