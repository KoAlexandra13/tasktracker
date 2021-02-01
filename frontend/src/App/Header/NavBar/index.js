import React from 'react'
import { Link } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import { connect } from 'react-redux';
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class NavBar extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            boardsPopUpEnabled: true,
            clickOnSearchButton: false,
            openSearchTextField: false
        }
    }

    getUserInitials = () => {
        const firstAndSecondNames = this.props.fullName ? this.props.fullName.split(' ') : [];
        return (firstAndSecondNames && firstAndSecondNames.length) ? firstAndSecondNames[0].charAt(0) + firstAndSecondNames[1].charAt(0) : null;
    }

    handleOpenSearchInput = () => {
        this.setState(
            {
                ...this.state, 
                clickOnSearchButton: !this.state.clickOnSearchButton,
                openSearchTextField: !this.state.openSearchTextField,
            }
        )
    }

    handleCloseSearchInput = () => {
        this.setState(
            {
                ...this.state, 
                clickOnSearchButton: !this.state.clickOnSearchButton,
                openSearchTextField: !this.state.openSearchTextField,
            }
        )
    }

    render(){
        const closeSearchStyle = this.state.openSearchTextField ? {
            display: 'none',
        } : {
            display: 'block',
        };

        const openSearchStyle = !this.state.openSearchTextField ? {
            display: 'none',
        } : {
            display: 'flex',
        };

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

                    {/*<p className='delimiter'>|</p>

                    <BoardsPopup/>*/}

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
                        <Link 
                            style={{
                                textDecoration: 'none'
                            }}
                            to='/account'>
                            <Avatar
                                src={this.props.image} 
                                alt='userIcon'
                                style={{
                                    height: '40px',
                                    width: '40px',
                                    backgroundColor: 'rgb(201, 97, 221)',
                                }} 
                                >   
                                    { this.getUserInitials() }
                            </Avatar>
                        </Link>
                    </button>

                    <div className='open-search' style = {openSearchStyle}>
                        <input 
                            type='search'
                            placeholder='Search...'/>
                        <button 
                            className='close-search-btn'
                            onClick={this.handleCloseSearchInput}>x</button>
                    </div>

                    <div className='close-search' style = {closeSearchStyle}>
                        <FontAwesomeIcon 
                            icon={ faSearch } 
                            className='text-light'
                            onClick={this.handleOpenSearchInput}
                            />
                    </div>

                </div>
            </div>
        );
    };
}

function mapStateToProps(state){
    return {
        fullName: state.user.fullName,
        image: state.user.userIcon,
    };
}


export default connect(mapStateToProps,{})(NavBar);

