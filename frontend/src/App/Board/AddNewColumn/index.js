import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import { connect } from 'react-redux';
import { addNewColumn } from '../../../actions/board';
import _ from 'lodash'

class AddNewColumn extends React.Component{
    constructor(props){
        super(props);

        this.wrapperRef = React.createRef();

        this.state = {
            isInputPaneOpen: false,
            columnName: '',
            error: null
        }
    }

    handleClickAddNewColumn = () => {
        this.setState({...this.state, isInputPaneOpen: !this.state.isInputPaneOpen, columnName: ''});
    }

    componentDidMount(){
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside = (event) => {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target) && this.state.isInputPaneOpen) {
            this.setState({...this.state, isInputPaneOpen: false, columnName: ''})
        }
    };

    clickAddNewColumnButton = () => {
        if(this.state.columnName){
            const columnData = {
                index: this.props.boardColumns.length,
                name: this.state.columnName,
                table: this.props.boardId,
            }

            this.setState({
                ...this.state, 
                error: null,
                isInputPaneOpen: false,
                columnName: ''
            });

            this.props.addNewColumn(columnData);
        }
        else {
            this.setState(
                {
                    ...this.state,
                    error: 'First add the column name!'
                })
        }
    } 

    handleClickCloseButton = () => {
        this.setState({...this.state, isInputPaneOpen: false, columnName: '', error: null});
    }

    getColumnName = (event) => {
        this.setState({...this.state, columnName: event.target.value})
    }

    pressEnter = (event) => {
        if (event.key === 'Enter'){
            this.clickAddNewColumnButton();
        }
    }

    render(){
        const styles = {
            buttonStyle: this.state.isInputPaneOpen ? {
                display: 'none'
            } : {
                display: 'flex'
            },
            inputStyle: !this.state.isInputPaneOpen ? {
                display: 'none'
            } : {
                display: 'block'
            },
            errorStyle: _.isNull(this.state.error) ? {
                display: 'none',
            } : {
                display: 'block',
            }
        }

        return(
            <div className='add-new-column-container'>
                <div style={styles.buttonStyle} className='add-new-column-button'>
                    <button 
                        onClick={this.handleClickAddNewColumn}
                    >
                        <AddIcon/>
                        <p>&nbsp;Add one more column </p>
                    </button>
                </div>

                <div 
                    style={styles.inputStyle} 
                    className='add-new-column-name'
                    ref={this.wrapperRef}
                >
                    <div className='input-container'>
                        <input 
                            type="text"
                            placeholder='Enter a column name...'
                            value={this.state.columnName}
                            onChange={this.getColumnName}
                            onKeyDown={this.pressEnter}/>

                            <span
                                style={styles.errorStyle}
                            >
                                {this.state.error}
                            </span>
                    </div>
                    <div className='options-button'>
                        <button 
                            onClick={this.clickAddNewColumnButton}
                            className='add-button'>
                            Add new column
                        </button>

                        <button 
                            onClick={this.handleClickCloseButton}
                            className='close-button'>
                            <CloseIcon style={{color: 'whitesmoke'}}/>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        boardId: state.board.boardId,
        boardColumns: state.board.boardColumns,
    };
}

export default connect(mapStateToProps, {addNewColumn})(AddNewColumn);
