import React  from 'react';
import NavBar from './Components/Headers'
//import LoginTab from './Components/LoginForm'
import './App.css';
import { BrowserRouter } from "react-router-dom";

//import RegForm from './Components/Regiser'
//import Homescreen from './Components/home'
//import {useAuth,getAuthToken} from "../src/Services/auth";
//import Layout from './Components/Layout';
import Router from './Components/Router';
import AuthDataProvider from './helpers/AuthDataProvider';
//import Auth from './Services/Authenticate';
import { GlobalProvider } from './Context/GlobalState';
import { SnackbarProvider } from 'notistack';
import Skeleton from 'react-loading-skeleton';
 

//export default class App extends Component {
  // constructor(props){
  //   super(props);
  //   this.state = {value: "" };
  // }
export default function App() {

//   const [authenticated, user] = useAuth(getAuthToken());
    const title ='';
    const body ='';
// console.log(authenticated,"authenticated")
  // render(){
    return (
      <BrowserRouter>
      <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
      <AuthDataProvider>
	       <GlobalProvider>
	           <NavBar/>
		        <Router/>
     {/* <div style={{ fontSize: 20, lineHeight: 2 }}>
        <h1>{title || <Skeleton />}</h1>
        {body || <Skeleton count={10} />}
      </div> */}
            {/* <Layout></Layout>  */}
        </GlobalProvider>
             </AuthDataProvider>
	       </SnackbarProvider>
          {/* <Router/> */}
      </BrowserRouter>
    );
  // }
}
