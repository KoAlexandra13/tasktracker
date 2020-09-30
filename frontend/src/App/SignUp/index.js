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
import axios from 'axios'

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
            isSignUpBtnDisabled: true,
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
        this.setState({...this.state, checkedTermsAndConditions: !this.state.checkedTermsAndConditions, 
            isSignUpBtnDisabled: this.state.checkedTermsAndConditions});
    };

    handleCheckSubscribe = () => this.setState({...this.state, checkedSubscribe: !this.state.checkedSubscribe})

    handleClickSignUp = () => {
        const requiredFieldsFilledIn = !(_.isEmpty(this.state.email) || _.isEmpty(this.state.username) 
            || _.isEmpty(this.state.password1) || _.isEmpty(this.state.password2) || _.isEmpty(this.state.fullName));

        if(!requiredFieldsFilledIn){
            this.setState(prevState => ({
                errors: {                   
                    ...prevState.errors,    
                    requiredFields: ['Fill in all required fields']
                }
            }));
        }else {
            this.setState(prevState => ({
                ...prevState,
                errors: _.omit(this.state.errors, ['requiredFields'])

            }))
        }     

        const config = {
            url: 'http://127.0.0.1:8000/api/users/sign_up/', 
            method: 'POST',
            data: {
                fullname: this.state.fullName,
                email: this.state.email,
                username: this.state.username,
                password1: this.state.password1,
                password2: this.state.password2
            }
        }

        //const axios = require('axios');

        axios(config)
            .then(response => {
                console.log(response.data);
                console.log(response.config);
                console.log(response.request);
                
            })
            .catch(error => {
                const data = error.response.data;
                Object.entries(data).map(([key, value]) => {
                    this.setState(prevState => ({
                        errors: {                   
                            ...prevState.errors,    
                            [key]: value
                        }
                    }))
                });
            });
    
    };


    render(){

        console.log(this.state.errors);

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

        const {password1, showPassword1, password2, showPassword2,
        isSignUpBtnDisabled, errors} = this.state;

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
                            disabled={isSignUpBtnDisabled}
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