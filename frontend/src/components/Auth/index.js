import React from 'react';
import Login from '../../App/Login';
import { connect } from 'react-redux';
import { fetchUser, userWillLogin, refreshAuthorizationToken } from '../../actions/user';
import {ClassicSpinner} from 'react-spinners-kit';

class Auth extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            tokenRefreshInterval: null
        }
    }
    
    componentDidMount = async () => {
        const refreshToken = localStorage.getItem('refreshToken');

        let userWillLogin = true;
        if (refreshToken){
            const newToken = await refreshAuthorizationToken(refreshToken); 
            if (newToken){
                userWillLogin = false;
                this.props.fetchUser();
            }
        }

        if (userWillLogin){
            this.props.userWillLogin();
        }
    }    

    componentDidUpdate(){
        const {user} = this.props;
        const {tokenRefreshInterval} = this.state;
        const isAuthenticated = new Boolean(user.username) && localStorage.getItem('accessToken');

        if (isAuthenticated && !tokenRefreshInterval){
            const interval = setInterval(
                refreshAuthorizationToken, 60 * 1000
            );
            this.setState({tokenRefreshInterval: interval});
        }
    }

    render(){
        const {isFetching, user, children} = this.props;
        if (isFetching){
            return ( 
                <div style={{
                   marginLeft: '50%',
                   marginTop: '20rem'
                }}>
                    <ClassicSpinner
                    size={30}
                    color='#2292ee'
                    loading={isFetching}
                    />
                </div>
            );
        };

        const isAuthenticated = new Boolean(user.username) && localStorage.getItem('accessToken');
        return( 
            <div>
                { 
                    isAuthenticated ? (
                        <div>
                            {children}
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

export default connect(mapStateToProps, { fetchUser, userWillLogin })(Auth);