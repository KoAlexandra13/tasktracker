import React from 'react';
import { Link } from "react-router-dom";

class PageUnderConstruction extends React.Component{
    render(){
        return(
            <div className='page-under-construction-container'>
                <div className='image-container'>
                    <img src={require('./images/page_not_found.png').default} alt="Error image"/>
                </div>
                <div className='error-mesage-container'>
                    <h3>Sorry, this page is under development...</h3>
                </div>
                <div className='button-container'>
                    <button>
                        <Link to='/'>
                            <p>Go to home page</p>
                        </Link>
                    </button>
                </div>
            </div>
        );
    }
}
export default PageUnderConstruction;