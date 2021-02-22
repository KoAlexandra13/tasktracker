import React from 'react'
import { Link } from "react-router-dom";
import BoardItem from './BoardItem'
import { connect } from 'react-redux';
import { getBoardTitlesList } from '../../actions/boardList';
import Header from '../Header';
import Footer from '../Footer';


class Home extends React.Component {

    componentDidMount(){
        this.props.getBoardTitlesList();
    }

    render(){

        const { personalBoardList } = this.props;

        return(
            <div className='home-page-container'>
                <Header/>
                <div className='boards'>
                    <div className='boards-container'>

                        <div className='personal-boards'>
                            <div className='personal-boards-title'>
                                <p>PERSONAL BOARDS: </p>
                            </div>

                            <ul className='personal-boards-list'>
                                { personalBoardList && personalBoardList.map((board, index) => <BoardItem 
                                    board={board}
                                    key={board.name + index}
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

                        {/*<div className='team-boards'>
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
                            
                        </div>*/}
                    </div> 
                </div>
                <Footer/>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        personalBoardList: state.addBoard.personalBoardList
    };
}

export default connect(mapStateToProps, { getBoardTitlesList })(Home);