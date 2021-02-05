import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

class AddNewColumn extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            isInputPaneOpen: false,
            columnName: ''
        }
    }

    handleClickAddNewColumn = () => {
        this.setState({...this.state, isInputPaneOpen: !this.state.isInputPaneOpen, columnName: ''});
    }

    handleClickCloseButton = () => {
        this.setState({...this.state, isInputPaneOpen: false, columnName: ''});
    }

    getBoardName = (event) => {
        this.setState({...this.state, columnName: event.target.value})
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
        }

        return(
            <div className='add-new-column-container'>
                <div style={styles.buttonStyle} className='add-new-column-button'>
                    <button 
                        onClick={this.handleClickAddNewColumn}>
                        <AddIcon/>
                        <p>&nbsp;Add one more column </p>
                    </button>
                </div>

                <div style={styles.inputStyle} className='add-new-column-name'>
                    <div className='input-container'>
                        <input 
                            type="text" 
                            placeholder='Enter a column name...'
                            onChange={this.getBoardName}/>
                    </div>
                    <div className='options-button'>
                        <button 
                            className='add-button'>
                            Add column
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

export default AddNewColumn;