import React from 'react'
import _ from 'lodash'
import { Link } from "react-router-dom";

class BoardItem extends React.Component {
    render(){

        const { board } = this.props;

        const style = _.isNull(board.background_image) ? {
            backgroundColor: board.background_color
        } : {
            background: 'url(' + board.background_image + ') no-repeat transparent center'
        }

        return(
            <li className='boards-list-item'>
                <Link to={`/board/${board.id}/`}>
                    <div 
                        className='item-container'
                        style={style}>
                        <div className='item-board-title'> 
                            <p className='title-text'>{board.name}</p> 
                        </div>
                    </div>
                </Link>
            </li>
        )
    }
}

export default BoardItem;