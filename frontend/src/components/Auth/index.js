import React from 'react';
import Login from '../../App/Login';
import { connect } from 'react-redux';
import { fetchUser, setAutorizationToken, refreshAuthorizationToken } from '../../actions/user';
import {ClassicSpinner} from 'react-spinners-kit';

class Auth extends React.Component{
    
    componentWillMount = async () => {
        const refreshToken = localStorage.getItem('refreshToken');
        setAutorizationToken(localStorage.getItem('accessToken'))

        await refreshAuthorizationToken(refreshToken); 
        
        this.props.fetchUser();
        
    }
    

    render(){
        const { isFetching } = this.props;
        if (isFetching){
            return ( 
                <div style={{
                   marginLeft: '50%',
                   marginTop: '20rem'
                }}>
                    <ClassicSpinner
                    size={ 30 }
                    color='#2292ee'
                    loading={ isFetching }
                    />
                </div>
            );
        }
        
        return( 
            <div>
                { 
                    this.props.user.username ? (
                        <div>
                            {this.props.children}
                        </div>
                    ) : <Login/> 
                } 
            </div>
        );
    };  
}

function mapStateToProps(state){
    return {
        user: state.user,
        isFetching: state.user.isFetching
    };
}

export default connect(mapStateToProps, { fetchUser })(Auth);