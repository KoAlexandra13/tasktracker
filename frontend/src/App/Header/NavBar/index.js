import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faHome, faTable, faSearch,
    faPlus, faBell
} from '@fortawesome/free-solid-svg-icons'
import { Image, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    logo: {
      width: 30,
      height: 30,
      borderRadius: 50
    },
  });
 

class NavBar extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="navbar-container py-2">
                <div className="navbar--left-section">
                    <button className="tip">
                        <FontAwesomeIcon icon={ faHome } className="text-light"/>
                        <span className="left">Home</span>
                    </button>

                    <button className="tip">
                        <FontAwesomeIcon icon={ faTable } className="text-light"/>
                        <span className="left">Boards</span>
                    </button>

                    <button className="tip">
                        <FontAwesomeIcon icon={ faSearch } className="text-light"/>
                        <span className="left">Search</span>
                    </button>
                </div>

                <div className="navbar--center-section">
                    <img src=""/>
                </div>

                <div className="navbar--right-section">
                    <button className="tip">
                        <FontAwesomeIcon icon={ faPlus } className="text-light"/>
                        <span className="right">Add new board</span>
                    </button>

                    <button className="tip">
                        <FontAwesomeIcon icon={ faBell } className="text-light"/>
                        <span className="right">Notifications</span>
                    </button>

                    <button className="user-photo">
                        <Image
                        source={require('./default-user-icon.png')}
                        style={styles.logo}
                        />
                    </button>


                </div>
            </div>
        );
    };
}

export default NavBar;