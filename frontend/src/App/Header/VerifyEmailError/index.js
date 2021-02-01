import React from 'react'
import {resendVerifyEmailRequest} from '../../../api/user'

class VerifyEmailError extends React.Component {
    render() {
        return (
            <div className='verify-error-container'>
                <div className='text-container'>
                    <p> Please, verify your email. </p>
                    <button
                        onClick={() => resendVerifyEmailRequest()}>
                        Resend mail!
                    </button>
                </div>
            </div>
        )
    }

}

export default VerifyEmailError;

