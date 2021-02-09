import React from 'react'
import CloseIcon from '@material-ui/icons/Close';


class Menu extends React.Component{
    render() {
        
        return (
            <div className='menu-container'>
                <div className='menu-tab'>
                    <div className='menu-header'>
                        <h5>Menu</h5>
                        <button
                            onClick={() => this.props.closeMenu()}>
                            <CloseIcon style={{marginTop: '1px'}}/>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Menu;