import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chats from '../Components/Chat/Chats';
import FetchChats from '../Components/Chat/FetchChats';
import Grid from '@material-ui/core/Grid';
import { Widget } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';



export default function ChatHome(){





return(
    <div className="App">
	<Chats/>
      <FetchChats/>
    </div>

);







}
