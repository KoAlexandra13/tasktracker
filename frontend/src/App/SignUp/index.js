import React from 'react'
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { Link } from "react-router-dom";
import _ from 'lodash';
import { signUpUser, userLogIn } from '../../actions/user';

class SignUp extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            fullName: '',
            email: '',
            username: '',
            password1: '',
            showPassword1: false,
            password2: '',
            showPassword2:false,
            checkedTermsAndConditions: false,
            checkedSubscribe: false,
            errors: {}
        }
    }

    handleChange = (prop) => (event) => {this.setState({...this.state, [prop]: event.target.value })};

    handleClickShowPassword1 = () => this.setState({...this.state, showPassword1: !this.state.showPassword1});

    handleClickShowPassword2 = () => this.setState({...this.state, showPassword2: !this.state.showPassword2});
    
    handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    handleCheckTermsAndConditions = () => {
        this.setState({
            ...this.state,
            checkedTermsAndConditions: !this.state.checkedTermsAndConditions, 
        });
    };

    handleCheckSubscribe = () => this.setState({...this.state, checkedSubscribe: !this.state.checkedSubscribe})

    requiredFieldsFilledIn = () => {
        const requiredFields = ['email', 'username', 'password1', 'password2', 'fullName']
        return requiredFields.every(field => !_.isEmpty(this.state[field]));
    }

    handleClickSignUp = async () => {
        const requiredFieldsFilledIn = this.requiredFieldsFilledIn();
        if(requiredFieldsFilledIn){
            const data = await signUpUser(
                this.state.fullName, this.state.email, this.state.username,
                this.state.password1, this.state.password2
            );
            if (_.isEmpty(data.errors)){

                const success = await userLogIn(this.state.username, this.state.password1);

                if (success){
                    window.location.href = '/';
                }
            }
            this.setState({errors: data.errors});
        } else {
            this.setState({errors: {requiredFields: ['Fill in all required fields']}});
        }     
    };


    render(){
        const styles = {
            paper : {
                width: '100%',
                height: '100%',
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: '2rem',
                display: 'flex'
            },

            textField: {
                width: '60%',
                marginTop: '1rem',
                textAligne: 'center',
                fontSize: 'medium'
            },

            passwordField : {
                width: '60%',
                marginTop: '1rem'
            },

            fieldsFont: {
                fontSize: 'medium', 
                color:'rgb(43, 40, 40)',
            }
        }

        const image = require('./images/signup.png').default;

        const {
            password1, showPassword1, 
            password2, showPassword2,
            errors, checkedTermsAndConditions
        } = this.state;

        const titleErrorStyle = Object.values(this.state.errors).some((value) => value !== null ) ? {
            display: 'flex'
        } : {
            display: 'none'
        };

        return(
            <div className='sign-up-page-container'>
                <div className='sign-up-form-container'>
                    <Paper 
                    style={ styles.paper }
                    elevation={3}>

                        <div className='sign-up-image-container'>
                            <img src={ image } alt={'sign-up'}/>
                        </div>

                        <div className='sign-up-form'>
                            <h4 className='sign-up-title'>Sign up</h4>

                            <TextField
                                label='Full name'
                                variant='outlined'
                                size='small'
                                style={styles.textField}
                                inputProps={{style: styles.fieldsFont}}
                                onChange={this.handleChange('fullName')}
                                required={true}
                            />

                            <TextField
                                label='Username'
                                variant='outlined'
                                size='small'
                                style={styles.textField}
                                inputProps={{style: styles.fieldsFont}}
                                required={true}
                                onChange={this.handleChange('username')} 
                            />

                            <TextField
                                label='Email'
                                variant='outlined'
                                size='small'
                                style={styles.textField}
                                inputProps={{style: styles.fieldsFont}}
                                required={true}
                                onChange={this.handleChange('email')} 
                            />

                            <TextField
                                label='Organization'
                                variant='outlined'
                                size='small'
                                style={styles.textField}
                                inputProps={{style: styles.fieldsFont}}
                                onChange={this.handleChange('organization')}
                            />
                        
                            <FormControl 
                                size='small' 
                                variant='outlined'
                                style={styles.passwordField}
                                required={true}
                            >

                                <InputLabel> 
                                    Password 
                                </InputLabel>

                                <OutlinedInput
                                        type={showPassword1 ? 'text' : 'password'}
                                        value={password1}
                                        onChange={this.handleChange('password1')}
                                        style={{padding : 0}}
                                        inputProps={{style: styles.fieldsFont}} 
                                        endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={this.handleClickShowPassword1}
                                            onMouseDown={this.handleMouseDownPassword}
                                            >
                                            {showPassword1 ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                        }
                                        labelWidth={70}
                                />
                            </FormControl>
                            

                            <FormControl 
                                size='small' 
                                variant='outlined'
                                style={styles.passwordField}
                                required={true}
                            >

                                <InputLabel> 
                                    Enter your password again
                                </InputLabel>

                                <OutlinedInput
                                        type={showPassword2 ? 'text' : 'password'}
                                        value={password2}
                                        onChange={this.handleChange('password2')}
                                        style={{padding : 0}}
                                        inputProps={{style: styles.fieldsFont}} 
                                        endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={this.handleClickShowPassword2}
                                            onMouseDown={this.handleMouseDownPassword}
                                            >
                                            {showPassword2 ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                        }
                                        labelWidth={195}
                                />
                            </FormControl>

                            {
                                <span 
                                    className='sign-up-form-error'
                                    style={ titleErrorStyle }>
                                        * {Object.values(errors)[0]} 
                                </span>
                                
                            }

                            <div className='checkboxes-container'>
                                <div className='terms-and-conditions-checkbox'>
                                    <input 
                                        type='checkbox' 
                                        className='terms-and-conditions' 
                                        onChange={this.handleCheckTermsAndConditions}/>
                                    <label>
                                        &nbsp;I Agree to Terms and Conditions.
                                    </label>   
                                </div> 

                                <div className='subscribe-chekbox'>
                                    <input 
                                        type='checkbox' 
                                        className='subscribe'
                                        onChange={this.handleCheckSubscribe}
                                    />
                                    <label>
                                        &nbsp;I Would like to recieve Promotional Offers.
                                    </label> 
                                </div>
                            </div>

                            <button 
                            className='sign-up-btn'
                            disabled={!checkedTermsAndConditions}
                            onClick={this.handleClickSignUp}
                            >
                                <p>SIGN UP</p>
                            </button>

                            <div className='login-contianer'>
                                <p className='title'>You already have an account?</p>
                                <Link to='/login'>
                                    <p className='login-link'>Login!</p>
                                </Link>
                            </div>   

                        </div>

                    </Paper>
                </div>
            </div>
        );
    }
}

export default SignUp;