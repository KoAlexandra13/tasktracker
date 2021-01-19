import React from 'react'
import Popup from 'reactjs-popup'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class SearchPopup extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
          isPopUpOpen: false,
        } 
    }

    handlePopUpOpen = () => this.setState({ ...this.state, isPopUpOpen: true });

    handlePopUpClose = () => this.setState({...this.state, isPopUpOpen: false});

    render(){

      const { isPopUpOpen } = this.state;


      const styles = {
        contentStyle: {
          width: '12em',
          height: '2rem',
          marginTop: '0.1em',
          marginLeft: '-7rem',
          borderColor: 'lightgray',
          borderRadius: '0.3rem',
          backgroundColor: 'white'
        },
        arrowStyle: {
          marginLeft: '7rem'
        } 
      };
        return(
            <Popup
            trigger={
              <button>
                  <FontAwesomeIcon icon={ faSearch } className='text-light'/>
              </button>}
            //on='focus'
            open={ isPopUpOpen }
            onClick={ this.handlePopUpOpen }
            closeOnDocumentClick
            contentStyle = { styles.contentStyle }
            arrowStyle = { styles.arrowStyle }
            >
              <div className='search-container'>

                <input type='text' className='search' placeholder='Search...'></input>
                
                <button 
                className='close-boards-popUp-button' onClick={ this.handlePopUpClose }>
                  &times;
                </button>
              </div>
          </Popup>
        );

    }
}

export default SearchPopup;