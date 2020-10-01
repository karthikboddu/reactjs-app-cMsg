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
    const SOCKET_IO_URL = "http://localhost:4000";
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
        let socket = socketIOClient("http://localhost:4000");
        socket.on('user-joined', data =>             
            enqueueSnackbar(`${data} loggedIn`, {
                    variant: 'info',
                }));

    };
        
    const socketMessages = (user) => {

        
        const parsedLoginUser = JSON.parse(loggedInUser);
        console.log(parsedLoginUser,"((((((((((((");
        const socket = socketIOClient(SOCKET_IO_URL);
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
                <Grid item md={4} className={classes.sidebar}>
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
                <Grid item md={8}>

                        {!isMobile && (
                        <ChatBox scope={scope} user={user} />
                        )}
                </Grid> 
            </Grid>
        </React.Fragment>
    );
};

export default Chats;
