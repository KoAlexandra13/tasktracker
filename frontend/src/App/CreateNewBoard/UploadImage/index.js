import React from 'react';

class UploadImage extends React.Component {

    render(){

        const {image, handleChangeBoardBackground} = this.props;

        return (
            <li 
            className='item-container'>
                <button 
                className='board-background-color-btn image' 
                onClick={ () => handleChangeBoardBackground(image)}
                >
                    <img className='image' src={image.dataURL} alt='Background'/>
                </button>
            </li>
        );
    }

}

export default UploadImage;