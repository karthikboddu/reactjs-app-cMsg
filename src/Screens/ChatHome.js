import React,{useContext} from 'react';
//import { makeStyles } from '@material-ui/core/styles';
//import FetchChats from '../Components/Chat/FetchChats';
import { useLocation } from 'react-router';

import 'react-chat-widget/lib/styles.css';
// import BottomBar from '../Components/Chat/BottomBar';

// import Users from '../Components/Chat/Users';
import Chats from '../Components/Chat/Chats';
import queryString from 'query-string';

export default function ChatHome(){


const location = useLocation();

    console.log(queryString.parse(location.search),"Sss");


return(
    <div >
	{/*<Chats/>
      <FetchChats/>
      <BottomBar/>*/}
     {/* <MessengerHome/>   */}
	<Chats/>
    </div>

);







}
