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
import { userLogIn } from '../../actions/user'

class Login extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            password: '',
            showPassword: false,
            emailOrUsername: '',
            error: null
        }
    }

    handleChange = (prop) => (event) => {this.setState({...this.state, [prop]: event.target.value})};

    handleClickShowPassword = () => this.setState({...this.state, showPassword: !this.state.showPassword});
    
    handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    handleSubmitLoginForm = async (e) => {
        e.preventDefault();
        const success = await userLogIn(this.state.emailOrUsername, this.state.password);

        if (success){
            window.location.href = '/';
        }
        else {
            this.setState({error: 'wrong login/email or password. Try again'});  
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
                fontSize: 'medium', 
                color:'rgb(43, 40, 40)',
            }
        }

        const image = require('./images/login2.png').default;

        const { password, showPassword, error} = this.state;

        const titleErrorStyle = _.isNull(error) ? {
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

                        <form className='login-form' onSubmit={this.handleSubmitLoginForm}>
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
                                * {error}
                            </span>
                            
                            <div className='options-container'>
                                <button>
                                    <Link to='/forgotpassword'>
                                        <p className='forgot-password-link'>Forgot password?</p>
                                    </Link>
                                </button>
                            </div>

                            <button className='login-btn'>
                                <p>LOGIN</p>
                            </button>

                            <div className='sign-up-contianer'>
                                <p className='title'>Don't have an account?</p>
                                <Link to='/signup'>
                                    <p className='sign-up-link'>Sign up!</p>
                                </Link>
                            </div>   

                        </form>

                    </Paper>
                </div>
            </div>
        );
    }
}

export default Login;