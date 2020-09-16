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
import { _ScrollView } from 'react-native';
import _ from 'lodash';

class SignUp extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            fullName: '',
            email: '',
            username: '',
            password: '',
            showPassword: false,
            password2: '',
            showPassword2:false,
            isSignUpBtnDisabled: true,
            checkedTermsAndConditions: false,
        }
    }

    handleChange = (prop) => (event) => {this.setState({...this.state, [prop]: event.target.value })};

    handleClickShowPassword = () => this.setState({...this.state, showPassword: !this.state.showPassword});

    handleClickShowPassword2 = () => this.setState({...this.state, showPassword2: !this.state.showPassword2});
    
    handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    handleCheckTermsAndConditions = () => {
        this.setState({...this.state, checkedTermsAndConditions: !this.state.checkedTermsAndConditions, 
            isSignUpBtnDisabled: this.state.checkedTermsAndConditions});
    };

    handleClickSignUp = () => {

        const isAllRequiredFeildFilledIn = !(_.isEmpty(this.state.email) || _.isEmpty(this.state.username) 
            || _.isEmpty(this.state.password) || _.isEmpty(this.state.password2));

        if(isAllRequiredFeildFilledIn){

        }
        else{

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

            feildsFont: {
                fontSize: 'medium', 
                color:'rgb(43, 40, 40)',
            }
        }

        const image = require('./images/signup.png').default;

        const {password, showPassword, password2, showPassword2,
        isSignUpBtnDisabled, isAllRequiredFeildFilledIn } = this.state;

        const titleErrorStyle = isAllRequiredFeildFilledIn ? {
            display: 'none'
        } : {
            display: 'flex'
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
                                inputProps={{style: styles.feildsFont}}
                            />

                            <TextField
                                label='Username'
                                variant='outlined'
                                size='small'
                                style={styles.textField}
                                inputProps={{style: styles.feildsFont}}
                                required={true} 
                            />

                            <TextField
                                label='Email'
                                variant='outlined'
                                size='small'
                                style={styles.textField}
                                inputProps={{style: styles.feildsFont}}
                                required={true} 
                            />

                            <TextField
                                label='Organization'
                                variant='outlined'
                                size='small'
                                style={styles.textField}
                                inputProps={{style: styles.feildsFont}}
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
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={this.handleChange('password')}
                                        style={{padding : 0}}
                                        inputProps={{style: styles.feildsFont}} 
                                        endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={this.handleClickShowPassword}
                                            onMouseDown={this.handleMouseDownPassword}
                                            >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
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
                                        inputProps={{style: styles.feildsFont}} 
                                        endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={this.handleClickShowPassword2}
                                            onMouseDown={this.handleMouseDownPassword}
                                            >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                        }
                                        labelWidth={195}
                                />
                            </FormControl>

                            <span 
                            className='sign-up-form-error'
                            style={ titleErrorStyle }>
                                * Wrong email/username or password, try again. 
                            </span>

                            <div className='checkboxes-container'>
                                <div className='terms-and-conditions-checkbox'>
                                    <input 
                                        type='checkbox' 
                                        className='terms-and-conditions' 
                                        id='terms-and-conditions'
                                        onChange={this.handleCheckTermsAndConditions}/>
                                    <label for='terms-and-conditions'>
                                        &nbsp;I Agree to Terms and Conditions.
                                    </label>   
                                </div> 

                                <div className='subscribe-chekbox'>
                                    <input 
                                        type='checkbox' 
                                        className='subscribe' 
                                        id='subscribe'/>
                                    <label for='subscribe'>
                                        &nbsp;I Would like to recieve Promotional Offers.
                                    </label> 
                                </div>
                            </div>

                            <button 
                            className='sign-up-btn'
                            disabled={isSignUpBtnDisabled}
                            onClick={this.handleClickSignUp}>
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