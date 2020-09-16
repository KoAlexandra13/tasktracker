import React from 'react'

class BoardDemoColumn extends React.Component {
    render(){

    const {columnTitle, boardWidth } = this.props;

    const style = {
        width: `${boardWidth / 5.5 }px`,
        height: `${boardWidth * 3 / 6.6 }px`
    };

    return(
        <div 
        className='board-demo-version-column'
        style={style}> 
        {columnTitle.label} 🍑 
        </div>
    );
    }
}

export default BoardDemoColumn;