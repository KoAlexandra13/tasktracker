import React from 'react'
import _ from 'lodash'
import { SwatchesPicker } from 'react-color'
import ImageUploading from 'react-images-uploading';
import UploadImage from './UploadImage';
import BackgroundItem from './BackgroundItem'
import BoardDemoColumn from './BoardDemoColumn'
import Creatable from 'react-select/creatable';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import { connect } from 'react-redux';
import { fetchBoard, setLoader, uploadImage } from '../../actions/board'
import Header from '../Header';
import Footer from '../Footer'
import {ClassicSpinner} from 'react-spinners-kit';


class CreateNewBoard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            displayColorPicker: false,
            images: [],
            width: window.innerWidth,
            isBoardTitleEntered: true,
            boardTitle: '',
            boardColumns: [],
            boardBackgroundColor: 'transparent',
            boardBackgroundURL: null,            
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
            require('./images/view_3.jpg').default,
            require('./images/view_4.jpg').default,
            require('./images/view_5.jpg').default,
        ];

        this.defaultColors = [
            '#af704b5e', '#f3dce1', '#d6b6cb', '#8eeaf9', '#d7f3a5d1', '#e619005e', '#007bff5e'
        ];
    }

    handleTitleChange = (event) => this.setState({...this.state, boardTitle: event.target.value})

    handleChooseCustomBackgroundColor = (color) => this.setState({...this.state, boardBackgroundColor: color.hex})

    handleColorPickerClick = () => this.setState({ ...this.state, displayColorPicker: !this.state.displayColorPicker });
    
    handleColorPickerClose = () => this.setState({ ...this.state, displayColorPicker: false });

    handleUploadImageChange = (uploadedImages) => this.setState({...this.state, images: uploadedImages});

    handleSelectOptionsChange = (selectOptions) => this.setState({...this.state, boardColumns: selectOptions})

    handleChangeBoardBackgroundColor = (value) => {
        this.setState({
            ...this.state, 
            boardBackgroundColor: value, 
            boardBackgroundURL: null
        })
    }

    handleChangeBoardBackgroundURL = (value) => {
        this.setState({
            ...this.state, 
            boardBackgroundURL: value, 
            boardBackgroundColor: null
        })
    }

    handleChangeBoardBackgroundUploadImage = (value) => {
        this.setState({
            ...this.state, 
            boardBackgroundURL: value.dataURL,
            boardBackgroundColor: null
        })
    }

    onError = (errors, files) => alert(errors, files);

    updateDimensions = () => this.setState({ ...this.state, width: window.innerWidth});

    componentDidMount = () => window.addEventListener('resize', this.updateDimensions);
      
    componentWillUnmount = () => window.removeEventListener('resize', this.updateDimensions);

    handleCreateBoard = async () => {
        if(this.props.boardTitle === ''){
            this.setState({...this.state, isBoardTitleEntered : false});
            window.scrollTo(0, 0);
        }
        else {
            let columns = this.state.boardColumns.map((el, index) => {
                let column = Object.create({})
                column.name = el.label
                column.index = index
                return column
            })

            let data = Object.create({});

            data.name = this.state.boardTitle;
            data.users= [this.props.userId];
            data.columns = columns;

            if(this.state.boardBackgroundColor){
                data.background_color = this.state.boardBackgroundColor
            }

            this.props.setLoader(true); 

            const id = await this.props.fetchBoard(data);

            if(!_.isNull(this.state.boardBackgroundURL)){
                const imageURL = {
                    image_from_url: `${window.location.origin}${this.state.boardBackgroundURL}` 
                }
                console.log(this.state.boardBackgroundURL)
                await this.props.uploadImage(id, imageURL);
            }

            this.props.setLoader(false);
        }
    }

    render(){

        const { images, width, isBoardTitleEntered, 
            boardColumns, boardBackgroundColor, boardBackgroundURL } = this.state;

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

        const Arrow = ({ text, className }) => {
            return (
              <div
                className={className}
              >{text}</div>
            );
          };
           
           
        const ArrowLeft = Arrow({ text: '◄', className: 'arrow-prev' });
        const ArrowRight = Arrow({ text: '►', className: 'arrow-next' });

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
                <div style={{minWidth: '600px', width: '100%'}}>
                    <Header/>
                    <div className='main-container'>
                        <h3>Create New Board</h3>
    
                        <div className='board-design-container'>
    
                            <div className='board-title-container'>
    
                                <div className='group'>      
                                    <input 
                                    type='text' 
                                    value={ this.state.boardTitle} 
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
                                                image={image} 
                                                key={`user-image-${index}`}
                                                handleChangeBoardBackground={this.handleChangeBoardBackgroundUploadImage}
                                                />)
                                        }
    
                                        <ImageUploading
                                            //multiple
                                            isClearable
                                            onChange={this.handleUploadImageChange}
                                            acceptType={['jpg', 'gif', 'png']}
                                            maxFileSize={ 5242880 }
                                            onError={this.onError}
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
    
                            <div className='d-flex'>
                                <Creatable
                                    isMulti
                                    options={this.options}
                                    placeholder='Select or create columns for your table...'
                                    className='w-100 custom-select-box'   
                                    classNamePrefix='custom-select-box'
                                    closeMenuOnSelect = {false}
                                    onChange={this.handleSelectOptionsChange }
                                />
    
                                <div className='create-new-board-container'> 
                                    <button className='create-new-board-btn'
                                    onClick={ this.handleCreateBoard }
                                    >
                                        <p>Create board</p>
                                    </button>
                                </div>
                            </div>
                            
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
                                    transition={false}
                                    wheel={false}
                                    arrowLeft={ArrowLeft}
                                    arrowRight={ArrowRight}
                                />
                            </div>
                        </div>
                    </div>
                    <Footer/>
                </div>
            );
        }
    }
}


function mapStateToProps(state){
    return {
        userId: state.user.userId,
        isLoading: state.board.isLoading,
        boardId: state.board.boardId 
    };
}

export default connect(mapStateToProps, 
    {
        fetchBoard, 
        setLoader,
        uploadImage,
    }
    )(CreateNewBoard);