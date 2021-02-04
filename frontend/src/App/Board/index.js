import React from 'react'
import { setLoader } from '../../actions/board';
import { editBoardNameRequest, getBoardRequest } from '../../api/board';
import Header from '../Header'
import { connect } from 'react-redux'
import { ClassicSpinner } from 'react-spinners-kit';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from './Column'

class Board extends React.Component{
    constructor(props){
        super(props);

        this.wrapperRef = React.createRef();

        this.state = {
            boardTitle: '',
            boardColumns: [],
            boardBackgroundImage: null,
            boardBackgroundColor: null,
            boardId: '',
            openEditTitlePane: false,
            favouriteBoard: false,
        }
    }

    handleChangeBoardTitle = (event) => {
        this.setState({...this.state, boardTitle: event.target.value})
    }

    openEditTitlePane = () => {
        this.setState({...this.state, openEditTitlePane: !this.state.openEditTitlePane})
    }
    
    handleClickOutside = (event) => {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target) && this.state.openEditTitlePane) {
           this.setState({...this.state, openEditTitlePane: false})
           editBoardNameRequest(this.state.boardTitle, this.state.boardId)
           .catch(error => console.log(error)) 
        }
    };

    handleChangeFavouriteIcon = () => {
        this.setState({...this.state, favouriteBoard: !this.state.favouriteBoard})
        //send put/patch request(change favourite board) 

    }

    onDragEnd = result => {

    }

    async componentDidMount(){
        const id = window.location.pathname.slice(-2, -1);

        this.props.setLoader(true); 

        await getBoardRequest(id)
        .then(response => {
            this.setState({
                ...this.state,
                boardTitle: response.data.name,
                boardId: response.data.id,
                boardBackgroundColor: response.data.background_color,
                boardBackgroundImage: response.data.background_image,
                boardColumns: response.data.columns,
                //favouriteBoard: response.data.favourite
            })
        })
        .catch(error => console.log(error))

        this.props.setLoader(false);

        document.addEventListener('mousedown', this.handleClickOutside);

    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    render(){
        
        const { boardBackgroundColor, boardBackgroundImage, boardTitle, 
            openEditTitlePane, favouriteBoard, boardColumns } = this.state;

        const styles = {
            boardBackgraundStyle : boardBackgroundColor === null ? {
                //background: 'url(' + boardBackgroundImage + ') no-repeat transparent center',
            } : {
                backgroundColor: boardBackgroundColor,
            },
            titleStyle: openEditTitlePane ? {
                display: 'none'
            } : {
                display: 'flex'
            },
            favouriteIcon: favouriteBoard ? {
                color: 'yellow'
            } : {
                color: 'white'
            }
        }
        
        if (this.props.isLoading){
            return ( 
                <div style={{
                   marginLeft: '50%',
                   marginTop: '20rem'
                }}>
                    <ClassicSpinner
                    size={30}
                    color='#2292ee'
                    loading={this.props.isLoading}
                    />
                </div>
            );
        }
        else {
            return(
                <div>
                    <Header/>
                    <div 
                        className='board-container'
                        style={styles.boardBackgraundStyle}>
                            <div className='board-header'>
                                <div className='favourite-board-button-container'>
                                    <button
                                        onClick={this.handleChangeFavouriteIcon}>
                                        <StarBorderOutlinedIcon
                                            style={styles.favouriteIcon}/>
                                    </button>
                                </div>

                                <div 
                                    className='board-title-container'>
                                    <h3 
                                        style={styles.titleStyle}
                                        onClick={this.openEditTitlePane}>
                                        {boardTitle}
                                    </h3>
                                    <input
                                        type='text'
                                        onChange={this.handleChangeBoardTitle}
                                        ref={this.wrapperRef}
                                        value={boardTitle} 
                                        style={
                                            {
                                                width : `${((boardTitle.length + 1) * 14)}px`,
                                                display: openEditTitlePane ? 'inline' : 'none'
                                            }
                                        }
                                        />
                                </div>
                                <div className='menu'>
                                    <button>
                                        Menu
                                    </button>
                                </div>
                            </div>
                            <DragDropContext
                                onDragEnd={this.onDragEnd}>

                                { boardColumns && boardColumns.map(column => 
                                <Column 
                                    key={column.id} 
                                    column={column} 
                                    tasks={column.tasks}/>
                                )}
                            </DragDropContext>
                    </div>
                </div>
            )
        }
    }
}

function mapStateToProps(state){
    return {
        isLoading: state.board.isLoading,
    };
}

export default connect(mapStateToProps, 
    {
        setLoader,
    }
)(Board);
