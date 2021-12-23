import React from 'react'
import {Redirect,Route} from 'react-router-dom'
import {getAuthToken}  from "../Services/auth";
// import {useAuth} from "../Services/auth";
// import {AuthContext} from '../Services/Authenticate'
import { useAuthDataContext }  from './AuthDataProvider';
export const PrivateRoute = ({ component: Component, ...rest }) => { 
  //const { isAuthenticated, isLoading } = useContext(AuthContext)
  //const [authenticated, user] = useAuth(getAuthToken());
 const {authData } = useAuthDataContext()
  return (
    <Route {...rest} render={props => (
    	getAuthToken() &&  authData  ? (
    <Component {...props}/>
    ) : (
    <Redirect to={{
    pathname: '/',
    state: { from: props.location }
    }}/>
    )
    )}/> )
}

