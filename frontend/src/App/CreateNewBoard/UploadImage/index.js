import React from 'react';

class UploadImage extends React.Component {

    render(){

        const {imageURL, handleChangeBoardBackground} = this.props;

        return (
            <li 
            className='item-container'>
                <button 
                className='board-background-color-btn image' 
                onClick={ () => handleChangeBoardBackground(imageURL) }
                >
                    <img className='image' src={imageURL} alt='Background'/>
                </button>
            </li>
        );
    }

}

export default UploadImage;