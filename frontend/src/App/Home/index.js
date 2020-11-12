import React from 'react'
import {  Link } from "react-router-dom";
import BoardItem from './BoardItem'
import { connect } from 'react-redux';
import { addPersonalBoard, addTeamBoard} from '../../actions/boardList';
import Header from '../Header';


class Home extends React.Component {

    render(){

        const { personalBoardList, teamBoardList} = this.props;

        return(
            <div>
                <Header/>
                <div className='boards'>
                    <div className='boards-container'>

                        <div className='personal-boards'>
                            <div className='personal-boards-title'>
                                <p>PERSONAL BOARDS: </p>
                            </div>

                            <ul className='personal-boards-list'>  
                                { personalBoardList.map((boardName, index) => <BoardItem 
                                    boardName={ boardName }
                                    key={boardName + index}
                                    />)
                                }
                                <li className='personal-boards-create-new-board-item'> 
                                    <Link to='/createnewboard'>
                                        <div className='item-container create-board-container'>
                                            <div className='item-title'> 
                                                <p className='title-text'>Create new board</p>
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                            </ul>

                        </div>

                        <div className='team-boards'>
                            <div className='team-boards-title'>
                                <p>TEAM BOARDS: </p>
                            </div>

                            <ul className='team-boards-list'>  
                                { teamBoardList.map((boardName, index) => <BoardItem 
                                    boardName={ boardName }
                                    key={boardName + index}
                                    />)
                                } 
                                <li className='team-boards-create-new-board-item'> 
                                    <Link to='/createnewteam'>
                                        <div className='item-container create-team-board-container'>
                                            <div className='item-title'> 
                                                <p className='title-text'>Create new team</p>
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                            </ul> 
                            
                        </div>
                    </div> 
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        personalBoardList: state.addBoard.personalBoardList,
        teamBoardList: state.addBoard.teamBoardList
    };
}

export default connect(mapStateToProps, {
    addPersonalBoard,
    addTeamBoard
})(Home);