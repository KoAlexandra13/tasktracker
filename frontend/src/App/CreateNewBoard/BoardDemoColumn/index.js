import React from 'react'

class BoardDemoColumn extends React.Component {
    render(){

    const {columnTitle, boardWidth } = this.props;

    const style = {
        width: `${boardWidth / 5.5 }px`,
        height: `${boardWidth * 3 / 6.5 }px`,
        opasity: '90%'
    };

    return(
        <div 
            className='board-demo-version-column'
            style={style}> 
            <p className='column-label'>
                {columnTitle.label} 
            </p>
        </div>
    );
    }
}

export default BoardDemoColumn;