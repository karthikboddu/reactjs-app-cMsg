import React, { useState,useContext,useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
// import List from '@material-ui/core/List';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {isMobile} from 'react-device-detect';
import Conversations from './Conversations';
import Users from './Users';
import ChatBox from './ChatBox';
import ChatUser from './ChatUser';
import socketIOClient from 'socket.io-client';
import { GlobalContext } from '../../Context/GlobalState';
import { useSnackbar } from 'notistack';
import { ChatItem } from 'react-chat-elements'
import 'react-chat-elements/dist/main.css';
import { MessageBox,ChatList } from 'react-chat-elements'
import Box from '@material-ui/core/Box';


const useStyles = makeStyles(theme => ({
    paper: {
        minHeight: 'calc(100vh - 64px)',
        borderRadius: 0,
    },
    sidebar: {
        zIndex: 8,
    },
    subheader: {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
    },
    globe: {
        backgroundColor: theme.palette.primary.dark,
    },
    subheaderText: {
        color: theme.palette.primary.dark,
    },
}));

const Chats = () => {
    const [scope, setScope] = useState('Global Chat');
    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [lastMessage, setLastMessage] = useState(null);
    const { chatMessages, getMessages } = useContext(GlobalContext);

    const {loggedInUser,getLoggedInUser } = useContext(GlobalContext);
    const { allChatUsers, getAllChatUser } = useContext(GlobalContext);
    const { chatUser, getSelectedChatUser } = useContext(GlobalContext);
    const {setSelectedChatUser } = useContext(GlobalContext);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const {recentChatMessages,getRecentMessagesByUser } = useContext(GlobalContext);
    const REACT_APP_SOCKET_IO_URL = process.env.REACT_APP_SOCKET_IO_URL;
    console.log("socket1",process.env.REACT_APP_SOCKET_IO_URL)
    const [tab, setTab] = useState(0);
    const [user, setUser] = useState(null);
    const classes = useStyles();

    const handleChange = (e, newVal) => {
        setTab(newVal);
    };
        
    useEffect(() => {
        getLoggedInUser();
        // socketMessages()

        getAllChatUser()
        getSelectedChatUser();
       userjoined()
    }, []);

    useEffect(() => {

    console.log(allChatUsers,"allChatUsers")
        if (allChatUsers) {  
        allChatUsers.map((number) =>
            socketMessages(number)
	       
        );   
        }
    }, [allChatUsers])

    const reloadRecentMessages = () => {

            getRecentMessagesByUser();

    };

    const reloadMessages = (id) => {
        // if (props.scope === 'Global Chat') {
        //     getGlobalMessages().then(res => {
        //         setMessages(res);
        //     });
        // } else 
            getMessages(id);
            //setMessages(chatMessages.conversations)
            console.log(messages,"msg")
    };


    const userjoined = () =>{
        console.log("userj")
        let socket = socketIOClient(REACT_APP_SOCKET_IO_URL);
        socket.on('user-joined', data =>             
            enqueueSnackbar(`${data} loggedIn`, {
                    variant: 'info',
                }));

    };
        
    const socketMessages = (user) => {

        
        const parsedLoginUser = JSON.parse(loggedInUser);
        console.log(parsedLoginUser,"((((((((((((");
        const socket = socketIOClient(REACT_APP_SOCKET_IO_URL,{transports: ['websocket']});
        const listenTo =`${user.id}${parsedLoginUser.id}`;  
        console.log(listenTo,"lis")
        console.log(allChatUsers,"allchatuser")
        if (user !== null ) {  
        socket.on(listenTo, data =>{ 
            console.log(data,"scocket")
            reloadMessages(user.id)
             reloadRecentMessages()
            enqueueSnackbar(`New Message ${data.data.author_username}`, {
                    variant: 'info',
                })
           } );
        }

    };  

    return (
        <React.Fragment>
            
            <Grid container>
                <Grid item xs={12} sm={12} md={4} className={classes.sidebar}>
                    <Paper className={classes.paper} square elevation={5}>
                        <Paper square>
                            <Tabs
                                onChange={handleChange}
                                variant="fullWidth"
                                value={tab}
                                indicatorColor="primary"
                                textColor="primary"
                            >
                                <Tab label="Chats" />
                                <Tab label="Users" />
                            </Tabs>
                        </Paper>
                        {tab === 0 && (
                            <Conversations 
                                onClick={e => setSelectedChatUser.chatUser(setUser)}
                                setUser={setUser}
                                setScope={setScope}
                            />
                        )}
                        {tab === 1 && (
                            <Users setUser={setUser} setScope={setScope} />
                        )}
                    </Paper>
                </Grid>
                
                <Grid item  md={8} >
                       
                        {!isMobile && (
                        <ChatBox scope={scope} user={user} />
                        )}
                     
                </Grid> 


            </Grid>
        </React.Fragment>
    );
};

export default Chats;
