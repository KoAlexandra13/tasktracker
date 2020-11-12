import React from 'react'
import _ from 'lodash'
import { SwatchesPicker } from 'react-color'
import ImageUploading from 'react-images-uploading';
import UploadImage from './UploadImage';
import BackgroundItem from './BackgroundItem'
import BoardDemoColumn from './BoardDemoColumn'
import CreatableSelect from 'react-select/lib/Creatable';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import { connect } from 'react-redux';
import { createNewBoardTitle, createNewBoardColumn, createNewBoardBackgroundColor,
    createNewBoardBackgroundURL
 } from '../../actions/board'
 import { addPersonalBoard } from '../../actions/boardList';
 import Header from '../Header';
 import { boardCreate } from '../../actions/board'

class CreateNewBoard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            displayColorPicker: false,
            images: [],
            width: window.innerWidth,
            isBoardTitleEntered: true,
        }

        this.popover = {
            position: 'absolute',
            zIndex: '2',
        };

        this.cover = {
            position: 'fixed',
            top: '0px',
            right: '0px',
            bottom: '0px',
            left: '0px',
        };

        this.options = [
            { label: 'To do', value: 'to do'},
            { label: 'In progress', value: 'in progress'},
            { label: 'Done', value: 'done'},
        ];

        this.defaultImagesURLs = [
            require('./images/view_1.jpg').default,
            require('./images/view_2.jpg').default, 
            require('./images/view_3.jpg').default
        ];

        this.defaultColors = [
            '#fdfbda', '#ffc0d0', '#cb9bba', '#0fc9e7', '#a7cf5d', '#ea9085', '#ffde7d'
        ];
    }

    handleTitleChange = (event) => this.props.createNewBoardTitle(event.target.value);

    handleChooseCustomBackgroundColor = (color) => this.props.createNewBoardBackgroundColor(color.hex);

    handleColorPickerClick = () => this.setState({ ...this.state, displayColorPicker: !this.state.displayColorPicker });
    
    handleColorPickerClose = () => this.setState({ ...this.state, displayColorPicker: false });

    handleUploadImageChange = (uploadedImages) => this.setState({...this.state, images: uploadedImages});

    handleSelectOptionsChange = (selectOptions) => this.props.createNewBoardColumn(selectOptions);

    handleChangeBoardBackgroundColor = (value) => this.props.createNewBoardBackgroundColor(value);

    handleChangeBoardBackgroundURL = (value) => this.props.createNewBoardBackgroundURL(value)

    onError = (errors, files) => {
        alert(errors, files);
    };

    updateDimensions = () => this.setState({ ...this.state, width: window.innerWidth});

    componentDidMount = () => window.addEventListener('resize', this.updateDimensions);
      
    componentWillUnmount = () => window.removeEventListener('resize', this.updateDimensions);

    handleCreateBoard = async () => {
        if(this.props.boardTitle === ''){
            this.setState({...this.state, isBoardTitleEntered : false});
            window.scrollTo(0, 0);
        }
        else {
            const success = await boardCreate(this.props.boardColumns,this.props.boardTitle, this.props.boardBackgroundURL);
            if(success){
                this.props.addPersonalBoard(this.props.boardTitle);
            }
        }
    }

    render(){

        const { images, width, isBoardTitleEntered } = this.state;

        const {boardColumns, boardBackgroundColor, boardBackgroundURL} = this.props;    

        const demoVersionBoardBackgraundStyle = boardBackgroundColor === null ? {
            background: 'url(' + boardBackgroundURL + ') no-repeat transparent center',
            height: `${ width * 3 / 6.2 }px`
        } : {
            backgroundColor: boardBackgroundColor,
            height: `${ width * 3 / 6.2 }px`
        };

        const titleErrorStyle = isBoardTitleEntered ? {
            display: 'none'
        } : {
            display: 'flex'
        }

        return(
            <div style={{minWidth: '600px', width: '100%'}}>
                <Header/>
                <div className='main-container'>
                    <h3>Create New Board</h3>

                    <div className='board-design-container'>

                        <div className='board-title-container'>

                            <div className='group'>      
                                <input 
                                type='text' 
                                value={ this.props.boardTitle} 
                                onChange={ this.handleTitleChange } 
                                required
                                />
                                <span className='highlight'></span>
                                <span className='bar'></span>
                                <label>Board title</label>
                            </div>

                            <span 
                            className='board-title-required-field'
                            style={ titleErrorStyle }>
                                * Please, fill in the board title 
                            </span>

                        </div>
                        
                        <div className='board-background-container'>
                            <fieldset>
                                <legend>Choose board background</legend>
                                <ul className='choose-baord-background'>

                                    {this.defaultColors.map(
                                        (color, index) => <BackgroundItem 
                                            color={color}
                                            image={null}
                                            key={`color-${index}`}
                                            handleChangeBoardBackground={this.handleChangeBoardBackgroundColor}
                                        />
                                    )}  

                                    <li className='item-container'>
                                        <button
                                        className='board-background-color-btn choose-btn' 
                                        onClick={ this.handleColorPickerClick }>
                                            <p>Custom color</p>
                                        </button>
                                        { this.state.displayColorPicker ? 
                                        <div style={ this.popover }>
                                            <div 
                                            style={ this.cover } 
                                            onClick={ this.handleColorPickerClose }/>
                                            <SwatchesPicker 
                                            onChange={ this.handleChooseCustomBackgroundColor}/>
                                        </div> : null }
                                    </li>

                                    {this.defaultImagesURLs.map(
                                        (image, index) => <BackgroundItem 
                                            image={image}
                                            key={`image-${index}`}
                                            handleChangeBoardBackground={this.handleChangeBoardBackgroundURL}
                                        /> 
                                    )}


                                    { !_.isEmpty(images) && images.map(
                                        (image, index) => <UploadImage 
                                                imageURL={image.dataURL} 
                                                key={`user-image-${index}`}
                                                handleChangeBoardBackground={this.handleChangeBoardBackgroundURL}
                                            />
                                        ) 
                                    }
                                        
                                    <ImageUploading
                                        multiple
                                        isClearable
                                        onChange={this.handleUploadImageChange}
                                        acceptType={['jpg', 'gif', 'png']}
                                        maxFileSize={ 5242880 }
                                        onError={ this.onError }
                                        >
                                        {({onImageUpload}) => {
                                            return (
                                                    <li className='item-container'>
                                                        <button 
                                                        onClick={onImageUpload}
                                                        className='board-background-color-btn choose-btn' 
                                                        > 
                                                            <p>Upload image</p>
                                                        </button>
                                                    </li>
                                            )
                                        }}
                                    </ImageUploading>
                                </ul>
                            </fieldset>  
                        </div>

                        <CreatableSelect
                            isMulti
                            options={this.options}
                            placeholder='Select or create columns for your table...'
                            className='w-100 custom-select-box'   
                            classNamePrefix='custom-select-box'
                            closeMenuOnSelect = { false }
                            onChange={this.handleSelectOptionsChange }
                        />
                        
                    </div>

                    <div className='board-demo-version-container'>
                        <h3>Board Demo Version</h3>  

                        <div 
                            className='board-demo-version' 
                            style={ demoVersionBoardBackgraundStyle }>
                            <ScrollMenu
                                data = { !_.isEmpty(boardColumns) && boardColumns.map(
                                            (column, index) => {
                                                return (<BoardDemoColumn 
                                                    columnTitle={ column }
                                                    boardWidth={ width } 
                                                    key={ `column-${index}` }
                                                />);
                                            })
                                }
                                />
                        </div>
                    </div>


                    <div className='create-new-board-container'> 
                        <button className='create-new-board-btn'
                        onClick={this.handleCreateBoard}
                        >Create board
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}


function mapStateToProps(state){
    return {
        boardTitle: state.newBoardCreator.boardTitle,
        boardColumns: state.newBoardCreator.boardColumns,
        boardBackgroundColor: state.newBoardCreator.boardBackgroundColor,
        boardBackgroundURL: state.newBoardCreator.boardBackgroundURL,
        personalBoardList: state.addBoard.personalBoardList
    };
}

export default connect(mapStateToProps, {
    createNewBoardTitle,
    createNewBoardColumn,
    createNewBoardBackgroundColor,
    createNewBoardBackgroundURL,
    addPersonalBoard
})(CreateNewBoard);