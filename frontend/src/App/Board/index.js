import React from 'react'
import { setLoader } from '../../actions/board';
import { editBoardNameRequest, getBoardRequest, editBoardColumnsRequest } from '../../api/board';
import Header from '../Header'
import { connect } from 'react-redux'
import { ClassicSpinner } from 'react-spinners-kit';
import StarBorderRoundedIcon from '@material-ui/icons/StarBorderRounded';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Column from './Column';
import _ from 'lodash'
import AddNewColumn from './AddNewColumn';
import MenuIcon from '@material-ui/icons/Menu';
import { getBoard, changeBoardTitle, changeBoardColumns } from '../../actions/board';
import Menu from './Menu'

class Board extends React.Component{
    constructor(props){
        super(props);

        this.wrapperRef = React.createRef();

        this.state = {
            openEditTitlePane: false,
            favouriteBoard: false,
            openMenuPane: false,
        }
    }

    handleChangeBoardTitle = (event) => {
        this.props.changeBoardTitle(event.target.value)
    }

    openEditTitlePane = () => {
        this.setState({...this.state, openEditTitlePane: !this.state.openEditTitlePane})
    }
    
    handleClickOutside = (event) => {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target) && this.state.openEditTitlePane) {
            this.setState({...this.state, openEditTitlePane: false})
            editBoardNameRequest(this.props.boardTitle, this.props.boardId)
            .catch(error => console.log(error)) 
        }
    };

    handleChangeFavouriteIcon = () => {
        this.setState({...this.state, favouriteBoard: !this.state.favouriteBoard})
        //send put/patch request(change favourite board) 

    }

    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.setState({...this.state, openEditTitlePane: false})
            editBoardNameRequest(this.props.boardTitle, this.props.boardId)
            .catch(error => console.log(error)) 
        }
    }

    handleOpenMenu = () => {
        this.setState({...this.state, openMenuPane: !this.state.openMenuPane})
    }

    onDragEnd = (result) => {
        const {destination, source, draggableId, type} = result;

        if(!destination || _.isUndefined(destination)){
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ){
            return;
        }

        if(type === 'column'){
            const newColumnOrder = Array.from(this.props.boardColumns);
            const draggedColumn = newColumnOrder.find(column => column.id.toString() === draggableId);

            newColumnOrder.splice(source.index, 1);
            newColumnOrder.splice(destination.index, 0, draggedColumn);

            newColumnOrder.forEach((column, index) => {
                column['index'] = index;
            })            

            /*editBoardColumnsRequest(newState.boardColumns, this.state.boardId, this.state.boardTitle)
            .then(() => this.setState(newState))
            .catch(error => console.log(error))*/
            
            this.props.changeBoardColumns(newColumnOrder);
            return;
        }


        const startColumn = this.props.boardColumns.find(column => column.id.toString() === source.droppableId);
        const finishColumn = this.props.boardColumns.find(column => column.id.toString() === destination.droppableId);

        if (startColumn.id === finishColumn.id){

            const newTasks = Array.from(startColumn.tasks);
            const draggedTask = startColumn.tasks.find(task => `task-${task.id.toString()}` === draggableId);

            newTasks.splice(source.index, 1);
            newTasks.splice(destination.index, 0, draggedTask);

            const newColumn = {
                ...startColumn,
                tasks: newTasks
            }

            this.props.boardColumns.splice(newColumn.index, 1, newColumn);

            const newProps = {
                ...this.props,
                boardColumns: [
                    ...this.props.boardColumns
                ]
            };

            /*editBoardColumnsRequest(newState.boardColumns, this.props.boardId, this.props.boardTitle)
            .then(() => this.setState(newState))
            .catch(error => console.log(error))*/

            this.props.changeBoardColumns(newProps.boardColumns);
            return;
        }

        const startTasks = Array.from(startColumn.tasks);
        const draggedTask = startTasks.splice(source.index, 1)[0];

        const newStartColumn = {
            ...startColumn,
            tasks: startTasks,
        }

        const finishTasks = Array.from(finishColumn.tasks);
        draggedTask.column = finishColumn.id;
        finishTasks.splice(destination.index, 0, draggedTask);

        const newFinishColumn = {
            ...finishColumn,
            tasks: finishTasks,
        }

        this.props.boardColumns.splice(newStartColumn.index, 1, newStartColumn);
        this.props.boardColumns.splice(newFinishColumn.index, 1, newFinishColumn);

        const newProps = {
            ...this.props,
            boardColumns: [
                ...this.props.boardColumns
            ]
        };

        /*editBoardColumnsRequest(newState.boardColumns, this.props.boardId, this.props.boardTitle)
        .then(() => this.setState(newState))
        .catch(error => console.log(error))*/

        this.props.changeBoardColumns(newProps.boardColumns);
    }

    async componentDidMount(){
        const id = window.location.pathname.split('/')[2];

        this.props.setLoader(true); 

        await this.props.getBoard(id);

        this.props.setLoader(false);

        document.addEventListener('mousedown', this.handleClickOutside);

    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    render(){
        
        const { boardBackgroundColor, boardTitle, boardColumns } = this.props;

        const { openEditTitlePane, favouriteBoard, openMenuPane } = this.state;

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
                        className='board-main-container'
                        style={styles.boardBackgraundStyle}>
                            <div className='board-header'>
                                <div className='favourite-board-button-container'>
                                    <button
                                        onClick={this.handleChangeFavouriteIcon}>
                                        <StarBorderRoundedIcon
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
                                        onKeyDown={this.handleKeyDown}
                                        />
                                </div>
                                <div className='menu'>
                                    <button
                                    onClick={this.handleOpenMenu}>
                                        <MenuIcon 
                                            style={{marginBottom: '2px', fontSize: 'large'}}/>
                                        &nbsp;Menu
                                    </button>
                                </div>
                            </div>
                            <div className='board-container'>
                                        <DragDropContext
                                            onDragEnd={this.onDragEnd}>
                                                <Droppable 
                                                    droppableId='all-columns' 
                                                    direction='horizontal' 
                                                    type='column'
                                                    >
                                                    {(provided) => (
                                                        <div   
                                                            className='columns-container'
                                                            {...provided.droppableProps}
                                                            ref={provided.innerRef}
                                                            >

                                                            { boardColumns && boardColumns.map((column, index) => 
                                                            <Column
                                                                key={column.id} 
                                                                column={column} 
                                                                index={index}
                                                                tasks={column.tasks}/>
                                                            )}
                                                            {provided.placeholder}
                                                        </div>
                                                    )}
                                                </Droppable>
                                        </DragDropContext>
                                <AddNewColumn/>
                            </div>
                    </div>
                    {openMenuPane && <Menu closeMenu={this.handleOpenMenu}/>}
                </div>
            )
        }
    }
}

function mapStateToProps(state){
    return {
        isLoading: state.board.isLoading,
        boardTitle: state.board.boardTitle,
        boardColumns: state.board.boardColumns,
        boardBackgroundImage: state.board.boardBackgroundImage,
        boardBackgroundColor: state.board.boardBackgroundColor,
        boardId: state.board.boardId
    };
}

export default connect(mapStateToProps, {
        setLoader,
        getBoard,
        changeBoardTitle,
        changeBoardColumns
    }
)(Board);
