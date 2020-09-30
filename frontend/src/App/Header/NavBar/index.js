import React from 'react'
import { Link } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import SearchPopup from './SearchPopup'
import BoardsPopup from './BoardsPopup'

const styles = {
    logo: {
        width: '200px',
        height: '60px',
        opacity: '95%'
      }
  };

class NavBar extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            boardsPopUpEnabled: true
        }
    }

    render(){
        return(
            <div className='navbar-container py-2'>
                <div className='navbar--left-section'>
                    <Link to='/home'>
                        <img className='logo' src={require('./images/logo2.svg').default} alt={"Logo"} />
                    </Link>
                </div>

                <div className='navbar--center-section'>
                    <button>
                        <Link to='/'>
                            <p className='navbar-titles'>HOME</p>
                        </Link>
                    </button>

                    <p className='delimiter'>|</p>

                    <BoardsPopup/>

                    <p className='delimiter'>|</p>

                    <button>
                        <Link to='/createnewboard' >
                            <p className='navbar-titles'>CREATE NEW BOARD</p>
                        </Link>
                    </button>

                    <p className='delimiter'>|</p>

                    <button>
                        <p className='navbar-titles'>ABOUT</p>
                    </button>


                </div>

                <div className='navbar--right-section'>
                    <button className='user-photo'>
                        <Avatar 
                            alt='userIcon' 
                            src={require('./images/default-user-icon.png').default} 
                            >
                                HG
                            </Avatar>
                    </button>

                    <SearchPopup />

                </div>
            </div>
        );
    };
}

export default NavBar;