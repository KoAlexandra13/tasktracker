import React from 'react'
import { setLoader } from '../../actions/board';
import { editBoardNameRequest, getBoardRequest, editBoardColumnsRequest } from '../../api/board';
import Header from '../Header'
import { connect } from 'react-redux'
import { ClassicSpinner } from 'react-spinners-kit';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Column from './Column';
import _ from 'lodash'
import AddNewColumn from './AddNewColumn';
import MenuIcon from '@material-ui/icons/Menu';

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

    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.setState({...this.state, openEditTitlePane: false})
            editBoardNameRequest(this.state.boardTitle, this.state.boardId)
            .catch(error => console.log(error)) 
        }
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
            const newColumnOrder = Array.from(this.state.boardColumns);
            const draggedColumn = newColumnOrder.find(column => column.id.toString() === draggableId);

            newColumnOrder.splice(source.index, 1);
            newColumnOrder.splice(destination.index, 0, draggedColumn);

            newColumnOrder.forEach((column, index) => {
                column['index'] = index;
            })

            const newState = {
                ...this.state,
                boardColumns: newColumnOrder,
            };

            /*editBoardColumnsRequest(newState.boardColumns, this.state.boardId, this.state.boardTitle)
            .then(() => this.setState(newState))
            .catch(error => console.log(error))*/
            
            this.setState(newState);
            return;
        }

        const startColumn = this.state.boardColumns.find(column => column.id.toString() === source.droppableId);
        const finishColumn = this.state.boardColumns.find(column => column.id.toString() === destination.droppableId);

        if (startColumn.id === finishColumn.id){

            const newTasks = Array.from(startColumn.tasks);
            const draggedTask = startColumn.tasks.find(task => task.id.toString() === draggableId);

            newTasks.splice(source.index, 1);
            newTasks.splice(destination.index, 0, draggedTask);

            const newColumn = {
                ...startColumn,
                tasks: newTasks
            }

            this.state.boardColumns.splice(newColumn.index, 1, newColumn)

            const newState = {
                ...this.state,
                boardColumns: [
                    ...this.state.boardColumns
                ]
            };

            /*editBoardColumnsRequest(newState.boardColumns, this.state.boardId, this.state.boardTitle)
            .then(() => this.setState(newState))
            .catch(error => console.log(error))*/

            this.setState(newState);
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

        this.state.boardColumns.splice(newStartColumn.index, 1, newStartColumn);
        this.state.boardColumns.splice(newFinishColumn.index, 1, newFinishColumn);


        const newState = {
            ...this.state,
            boardColumns: [
                ...this.state.boardColumns
            ]
        };

        /*editBoardColumnsRequest(newState.boardColumns, this.state.boardId, this.state.boardTitle)
        .then(() => this.setState(newState))
        .catch(error => console.log(error))*/

        this.setState(newState);
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
        
        const { boardBackgroundColor, boardTitle, openEditTitlePane, 
            favouriteBoard, boardColumns } = this.state;

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
                                        onKeyDown={this.handleKeyDown}
                                        />
                                </div>
                                <div className='menu'>
                                    <button>
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
