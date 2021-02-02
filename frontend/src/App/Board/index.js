import React from 'react'
import { setLoader } from '../../actions/board';
import { getBoardRequest } from '../../api/board';
import Header from '../Header'
import { connect } from 'react-redux'
import { ClassicSpinner } from 'react-spinners-kit';


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
        }
    }

    handleChangeBoardTitle = (event) => {
        this.setState({...this.state, boardTitle: event.target.value})
    }

    openEditTitlePane = () => {
        this.setState({...this.state, openEditTitlePane: !this.state.openEditTitlePane})
    }
    
    handleClickOutside = (event) => {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
           this.setState({...this.state, openEditTitlePane: false})
        }
    };

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
                boardColumns: response.data.columns
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
            openEditTitlePane } = this.state;

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
