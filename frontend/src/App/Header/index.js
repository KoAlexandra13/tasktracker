import React from 'react';
import NavBar from './NavBar'

class Header extends React.Component{

    render(){
        return(
            <div className='header'>
                <div className='header-container px-3'>
                    <nav>
                        <NavBar/>
                    </nav>
                </div>
               
            </div>
        );
    };
}

export default Header;