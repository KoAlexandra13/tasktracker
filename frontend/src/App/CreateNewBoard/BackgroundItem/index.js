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

        const { image, handleChangeBoardBackground, color, 
            index,addActiveClass, isActive } = this.props;

        let name = image ? 'board-background-color-btn image' : 'board-background-color-btn';

        if(isActive){
            name = `${name} active` 
        }

        const value = image ? image : color;

        const { itemStyle } = this.state;

        return (
            <li
            className='item-container'>
                <button 
                className={`${name}`}
                style={itemStyle}
                onClick={() => {
                    addActiveClass(index, () => handleChangeBoardBackground(value))
                }}
                >
                    {image && <img className='image' src={image} alt='Background'/>}
                </button>
            </li>
        );
    }

}

export default BackgroundItem;