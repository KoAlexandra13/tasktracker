import React from 'react'

class BoardItem extends React.Component {
    render(){

        const { boardName } = this.props;

        return(
            <li className='boards-list-item'>
                <a href='/'>
                    <div className='item-container'>
                        <div className='item-title'> 
                            { boardName }
                        </div>
                    </div>
                </a>
            </li>
        )
    }
}

export default BoardItem;