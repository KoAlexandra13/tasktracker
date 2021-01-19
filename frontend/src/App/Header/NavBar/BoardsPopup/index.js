import React from 'react'
import Popup from 'reactjs-popup'
import Favourites from './Favourites';
import FreqVisited from './FreqVisited'
import Personal from './Personal'

class BoardsPopup extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
          isPopUpOpen: false,
          isFavouritesOpen : false,
          isFreqVisitedOpen : false,
          isPersonalOpen : false,
        } 
    }

    handlePopUpOpen = () => this.setState({ ...this.state, isPopUpOpen: true });

    handlePopUpClose = () => this.setState({...this.state, 
      isPopUpOpen: !this.state.isPopUpOpen,
      isFavouritesOpen: false,
      isFreqVisitedOpen: false,
      isPersonalOpen: false,
    });

    onFavouritesToggleOn = () => this.setState({...this.state, isFavouritesOpen: !this.state.isFavouritesOpen});

    onFrequentlyVisitedToggleOn = () => this.setState({...this.state, isFreqVisitedOpen: !this.state.isFreqVisitedOpen});

    onPersonalToggleOn = () => this.setState({...this.state, isPersonalOpen: !this.state.isPersonalOpen});

    render(){
      
      const { isPopUpOpen, isFavouritesOpen, isFreqVisitedOpen, isPersonalOpen} = this.state;

      const styles = {
        contentStyle: {
          width: '15em',
          marginTop: '0.5rem',
          marginLeft: '3.1em',
          borderColor: 'lightgray',
          borderRadius: '0.3rem',
          backgroundColor: 'white'
        },
        arrowStyle : {
          marginLeft: '-5.5rem'
        }
      };

      return(
          <Popup
            trigger={
              <button>
                  <p className='navbar-titles'>MY BOARDS</p>
              </button>}
            //on='focus'
            open={ isPopUpOpen }
            onOpen={ this.handlePopUpOpen }
            closeOnDocumentClick
            contentStyle = { styles.contentStyle }
            arrowStyle = { styles.arrowStyle }
          >
            <div className='popUp-boards-container'>

              <div className='favourites'>
                <div className="favourites-header">
                
                  <div className='boards-popUp-text'>
                    <p>FAVOURITES</p> 
                  </div>

                  <button
                    className='open-button-boards-popUp'
                    onClick={e => this.onFavouritesToggleOn()}
                  >
                    {this.state.isFavouritesOpen ? '-' : '+'}
                  </button>
                </div>
                { isFavouritesOpen && <Favourites/> }
              </div>
              
              <div className='frequently-visited'>
                <div className="frequently-visited-header">
                
                  <div className='boards-popUp-text'>
                    <p>FREQUENTLY VISITED</p> 
                  </div>

                  <button
                    className='open-button-boards-popUp'
                    onClick={e => this.onFrequentlyVisitedToggleOn()}
                  >
                    {this.state.isFreqVisitedOpen ? '-' : '+'}
                  </button>
                </div>
                { isFreqVisitedOpen && <FreqVisited/> }
              </div>

              <div className='personal'>
                <div className='personal-header'>

                  <div className='boards-popUp-text'>
                    <p>PERSONAL</p> 
                  </div>

                  <button
                    className='open-button-boards-popUp'
                    onClick={e => this.onPersonalToggleOn()}
                  >
                    { this.state.isPersonalOpen ? '-' : '+' }
                  </button>
                </div>
                { isPersonalOpen && <Personal/> }
              </div>
            </div>
        </Popup>
      );

    }
}

export default BoardsPopup;