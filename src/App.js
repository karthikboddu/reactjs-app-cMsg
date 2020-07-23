import React, { Component } from 'react';
import NavBar from './Components/Headers'
import LoginTab from './Components/LoginForm'
import './App.css';
import { BrowserRouter, Switch , Route } from "react-router-dom";

import RegForm from './Components/Regiser'
import Homescreen from './Components/home'
import {useAuth,getAuthToken} from "../src/Services/auth";
import Layout from './Components/Layout';
import Router from './Components/Router';
import AuthDataProvider from './helpers/AuthDataProvider';
import Auth from './Services/Authenticate';
import { GlobalProvider } from './Context/GlobalState';
//export default class App extends Component {
  // constructor(props){
  //   super(props);
  //   this.state = {value: "" };
  // }
export default function App() {

//   const [authenticated, user] = useAuth(getAuthToken());

// console.log(authenticated,"authenticated")
  // render(){
    return (
      <BrowserRouter>
      <AuthDataProvider>
	<GlobalProvider>
	
		<Router/>
            {/* <Layout></Layout>  */}
</GlobalProvider>
             </AuthDataProvider>
	
          {/* <Router/> */}
      </BrowserRouter>
    );
  // }
}
