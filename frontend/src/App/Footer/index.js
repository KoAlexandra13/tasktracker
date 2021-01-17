import React from 'react'
import { Link } from "react-router-dom";

class Footer extends React.Component{

    render(){
        const linkStyle = {
            marginRight: '1.5rem',
            color: 'white',
        }
        return (
            <div className='footer-container'>
                <div className='navbar-section'>
                    
                    <Link 
                        style={linkStyle}
                        to='/account'>
                        <p className='navbar-title'>Account</p>
                    </Link>
                
                    <Link 
                        style={linkStyle}
                        to='/termsAndConditions'>
                        <p className='navbar-title'>Terms and Conditions</p>
                    </Link>
                
                    <Link 
                        style={linkStyle}
                        to='/about'>
                        <p className='navbar-title'>About</p>
                    </Link>

                </div>
                <p className='copyright-text'>
                    © Kornievich A., 2020</p> 
            </div>
        );
    }
}

export default Footer;