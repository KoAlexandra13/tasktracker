import React from 'react';
import NavBar from './NavBar'
import VerifyEmailError from './VerifyEmailError';
import { connect } from 'react-redux'

class Header extends React.Component{

    render(){
        return(
            <div className='header'>
                <div className='header-container px-3'>
                    <nav>
                        <NavBar/>
                    </nav>
                </div>
                <div className='header-verify-email-error'>
                    {!this.props.verifyEmail && <VerifyEmailError/>}
                </div>
            </div>
        );
    };
}

function mapStateToProps(state){
    return {
        verifyEmail: state.user.verifyEmail,
    };
}

export default connect(mapStateToProps, {})(Header);