import React from 'react'
import { Link } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import SearchPopup from './SearchPopup';
import BoardsPopup from './BoardsPopup';
import { connect } from 'react-redux';

class NavBar extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            boardsPopUpEnabled: true
        }
    }

    getUserInitials = () => {
        const firstAndSecondNames = this.props.fullName ? this.props.fullName.split(' ') : [];
        return (firstAndSecondNames && firstAndSecondNames.length) ? firstAndSecondNames[0].charAt(0) + firstAndSecondNames[1].charAt(0) : null;
    }

    render(){
        return(
            <div className='navbar-container py-2'>
                <div className='navbar--left-section'>
                    <Link to='/'>
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
                        <Link to='/account'>
                            <Avatar
                                alt='userIcon'
                                style={{
                                    height: '35px',
                                    width: '35px',
                                    backgroundColor: 'rgb(201, 97, 221)',
                                }} 
                                >   
                                    { this.getUserInitials() }
                            </Avatar>
                        </Link>
                    </button>

                    <SearchPopup />

                </div>
            </div>
        );
    };
}

function mapStateToProps(state){
    return {
        fullName: state.user.fullName,
        userIcon: state.user.userIcon
    };
}


export default connect(mapStateToProps,{})(NavBar);

