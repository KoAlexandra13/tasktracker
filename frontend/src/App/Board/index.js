import React from 'react'
import { setLoader } from '../../actions/board';
import { editBoardNameRequest, editTaskPositionRequest, editBoardColumnsOrderRequest } from '../../api/board';
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
        //send put/patch request(change favorite board) 

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

    onDragEnd = async (result) => {
        const {destination, source, draggableId, type} = result;

        const oldColumnOrder = Array.from(this.props.boardColumns);

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
            });

            this.props.changeBoardColumns(newColumnOrder);
            
            await editBoardColumnsOrderRequest(newColumnOrder.map(column => column.id), this.props.boardId)
            .then(response => {
                this.props.changeBoardColumns(response.data.columns.sort(function(a,b) {
                    return a.index - b.index;
                }));
            })
            .catch(error => {
                console.log(error)
                this.props.changeBoardColumns(oldColumnOrder);
            })

            return;
        }

        const startColumn = this.props.boardColumns.find(column => column.id.toString() === source.droppableId);
        const finishColumn = this.props.boardColumns.find(column => column.id.toString() === destination.droppableId);

        if (startColumn.id === finishColumn.id){

            const newTasks = Array.from(startColumn.tasks);
            const draggedTask = startColumn.tasks.find(task => `task-${task.id.toString()}` === draggableId);

            newTasks.splice(source.index, 1);
            newTasks.splice(destination.index, 0, draggedTask);

            newTasks.forEach((task, index) => {
                task['index'] = index;
            })            

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

            this.props.changeBoardColumns(newProps.boardColumns);

            await editTaskPositionRequest(newTasks.map(task => task.id), startColumn.id)
            .catch(error => {
                console.log(error)
                this.props.changeBoardColumns(oldColumnOrder);
            })

            return;
        }

        const startTasks = Array.from(startColumn.tasks);

        const draggedTask = startTasks.splice(source.index, 1)[0];

        startTasks.forEach((task, index) => {
            task['index'] = index;
        })
        

        const newStartColumn = {
            ...startColumn,
            tasks: startTasks,
        }

        const finishTasks = Array.from(finishColumn.tasks);

        draggedTask.column = finishColumn.id;
        finishTasks.splice(destination.index, 0, draggedTask);

        finishTasks.forEach((task, index) => {
            task['index'] = index;
        })   

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


        this.props.changeBoardColumns(newProps.boardColumns);

        await editTaskPositionRequest(finishTasks.map(task => task.id), finishColumn.id)
        .catch(error => {
            console.log(error)
            this.props.changeBoardColumns(oldColumnOrder);
        })

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
        
        const { boardBackgroundColor, boardBackgroundImage, boardTitle, boardColumns } = this.props;

        const { openEditTitlePane, favouriteBoard, openMenuPane } = this.state;

        const styles = {
            boardBackgroundStyle : boardBackgroundColor === null ? {
                backgroundImage: 'url(' + boardBackgroundImage + ')',
                backgroundSize: '100% auto',
                backgroundRepeat: 'repeat-y'
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
                        style={styles.boardBackgroundStyle}>
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
                                                                tasks={column.tasks.sort(function(a,b) {
                                                                    return a.index - b.index
                                                                })}/>
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
