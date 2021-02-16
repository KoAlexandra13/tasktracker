import React from 'react';

class BackgroundItem extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            itemStyle: this.props.color ? {
                backgroundColor : this.props.color,
            } : {}
        }
    }
    render(){

        const { image, handleChangeBoardBackground, color } = this.props;

        const name = image ? 'board-background-color-btn image' : 'board-background-color-btn';

        const value = image ? image : color;

        const { itemStyle } = this.state;

        return (
            <li
            className='item-container'>
                <button 
                className={name}
                style={itemStyle}
                onClick={() => handleChangeBoardBackground(value)}
                >
                    {image && <img className='image' src={image} alt='Background'/>}
                </button>
            </li>
        );
    }

}

export default BackgroundItem;