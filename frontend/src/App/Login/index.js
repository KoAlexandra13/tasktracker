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
import { Link } from 'react-router-dom';
import _ from 'lodash'


class Login extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            password: '',
            showPassword: false,
            emailOrUsername: '',
            isEnteredDataCorrect: true
        }
    }

    handleChange = (prop) => (event) => {this.setState({...this.state, [prop]: event.target.value })};

    handleClickShowPassword = () => this.setState({...this.state, showPassword: !this.state.showPassword});
    
    handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    handleClickLoginButton = () => {
        if( !_.isEmpty(this.state.password) && !_.isEmpty(this.state.emailOrUsername)){
            this.setState({...this.state, isEnteredDataCorrect: true})
            //TODO: verify entered email/username and password
        }
        else{
            this.setState({...this.state, isEnteredDataCorrect: false})
        }
    }
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
                fontSize: 'small'
            },

            passwordField : {
                width: '60%',
                marginTop: '1rem'
            },

            feildsFont: {
                fontSize: 'small', 
                color:'rgb(43, 40, 40)',
            }
        }

        const image = require('./images/login2.png').default;

        const { password, showPassword, isEnteredDataCorrect } = this.state;

        const titleErrorStyle = isEnteredDataCorrect ? {
            display: 'none'
        } : {
            display: 'flex'
        }
        
        return(
            <div className='login-page-container'>
                <div className='login-form-container'>
                    <Paper 
                    style={ styles.paper }
                    elevation={3}>

                        <div className='login-image-container'>
                            <img src={ image } alt={'login'}/>
                        </div>

                        <div className='login-form'>
                            <h4 className='login-title'>Login to continue </h4>

                            <TextField
                                label='Email or username'
                                variant='outlined'
                                size='small'
                                style={styles.textField}
                                inputProps={{style: styles.feildsFont}}
                                onChange={this.handleChange('emailOrUsername')}
                            />
                        
                            <FormControl 
                                size='small' 
                                variant='outlined'
                                style={styles.passwordField}
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
                                        <InputAdornment position='end'>
                                            <IconButton
                                            aria-label='toggle password visibility'
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

                            <span 
                            className='login-form-error'
                            style={ titleErrorStyle }>
                                * Wrong email/username or password, try again. 
                            </span>
                            
                            <div className='options-container'>
                                <button>
                                    <Link to='/forgotpassword'>
                                        <p className='forgot-password-link'>Forgot password?</p>
                                    </Link>
                                </button>
                            </div>

                            <button 
                            className='login-btn'
                            onClick={this.handleClickLoginButton}>
                                <p>LOGIN</p>
                            </button>

                            <div className='sign-up-contianer'>
                                <p className='title'>Don't have an account?</p>
                                <Link to='/signup'>
                                    <p className='sign-up-link'>Sign up!</p>
                                </Link>
                            </div>   

                        </div>

                    </Paper>
                </div>
            </div>
        );
    }
}

export default Login;