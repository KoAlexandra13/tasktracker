import React from 'react';

class UploadImage extends React.Component {

    render(){

        const {image, handleChangeBoardBackground, isActive,
            index, addActiveClass} = this.props;

        let name = `board-background-color-btn image`;

        if(isActive){
            name = `${name} active`; 
        }

        return (
            <li 
            className='item-container'>
                <button 
                    className={name}
                    onClick={ () => addActiveClass(index, () => handleChangeBoardBackground(image))
                }
                >
                    <img className='image' src={image.dataURL} alt='Background'/>
                </button>
            </li>
        );
    }

}

export default UploadImage;