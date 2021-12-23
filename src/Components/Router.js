import React from 'react';
import { Route, Switch } from "react-router-dom";
import { PrivateRoute } from "../helpers/PrivateRoute"
import RegForm from './Regiser'
import Homescreen from './home'
import LoginTab from './LoginForm'
//import NavBar from './Headers'
import Test from './Test'
import ChatHome from '../Screens/ChatHome'
import ExpenseScreen from '../Screens/ExpenseScreen'
import ChatUser from './Chat/ChatUser'
import { SnackbarProvider } from 'notistack';

//import history from '../helpers/history';
const Router = () => {

    return (
	
        <Switch>
            <Route exact path="/" component={Homescreen} />
            <Route path="/login" component={LoginTab}></Route>
            <Route path="/register" component={RegForm}></Route>
	        <Route path="/test" component={Test}></Route>
 		     <PrivateRoute path="/chats" component={ChatHome}/>
             <PrivateRoute path="/chatuser" component={ChatUser}/>
             <PrivateRoute path="/home" component={Homescreen} />
             <PrivateRoute path="/product" component={ExpenseScreen} />
             <PrivateRoute path="/expenses" component={ExpenseScreen} /> 
            </Switch>

    )


}

export default Router;
