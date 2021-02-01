import React from 'react'
import { ClassicSpinner } from 'react-spinners-kit';
import { verifyEmail } from '../../actions/user'
import qs from 'qs'
import { Link } from "react-router-dom";

class VerifyEmail extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            success: null
        }
    }

    syncVerifyEmail(email){
        const success = verifyEmail(email);
        return success;
    }

    async componentDidMount(){
        const token = qs.parse(this.props.location.search, { ignoreQueryPrefix: true })
        const success = await this.syncVerifyEmail(token);
        this.setState({success: success});
    }

    render(){
        const {success} = this.state;
        console.log(success)
        if(success){
            return (
                <div className='success-verify-email-container'>
                    <div className='image-container'>
                        <img src={require('./image/success_verification.jpg').default} alt="Success verification"/>
                    </div>
                    <div className='button-container'>
                        <Link 
                            style={{
                                textDecoration: 'none'
                            }}
                            to='/'>
                            <button>
                                Go to home page
                            </button>
                        </Link>
                    </div>
                </div>
            )
        }
        else if(!success){
            return (
                <div className='error-verify-email-container'>
                    <div className='image-container'>
                        <img src={require('./image/verification_error.jpg').default} alt="Error verification"/>
                    </div>
                    <div className='button-container'>
                        <Link 
                            style={{
                                textDecoration: 'none'
                            }}
                            to='/'>
                            <button>
                                Go to home page
                            </button>
                        </Link>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div style={{
                    marginLeft: '50%',
                    marginTop: '20rem'
                 }}>
                     <ClassicSpinner
                     size={30}
                     color='#2292ee'
                     loading={this.props.isLoading}
                     />
                 </div>
            )
        }
    }
}

export default VerifyEmail;