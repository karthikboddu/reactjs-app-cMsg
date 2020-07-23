import React, { Component } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { PrivateRoute } from "../helpers/PrivateRoute"
import RegForm from './Regiser'
import Homescreen from './home'
import LoginTab from './LoginForm'
import NavBar from './Headers'
import Test from './Test'
import ChatHome from '../Screens/ChatHome'
const Router = () => {

    return (
        <Switch>
            <Route exact path="/" component={LoginTab} />
            <Route path="/login" component={LoginTab}></Route>
            <Route path="/register" component={RegForm}></Route>
	    <Route path="/test" component={Test}></Route>
 		<Route path="/chats" component={ChatHome}></Route>
            <PrivateRoute path="/home" component={Homescreen} />
        </Switch>
    )


}

export default Router;
