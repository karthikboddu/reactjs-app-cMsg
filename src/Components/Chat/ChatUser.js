import React, { useState,useContext, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import socketIOClient from 'socket.io-client';
import { GlobalContext } from '../../Context/GlobalState';
import { useSnackbar } from 'notistack';
// import {
//     useGetGlobalMessages,
//     useSendGlobalMessage,
//     useGetConversationMessages,
//     useSendConversationMessage,
// } from '../Services/chatService';

const useStyles = makeStyles(theme => ({
    root: {
        height: '100%',
                alignItems: 'center',
        justifyContent: 'center',
    },
    headerRow: {
        maxHeight: 60,
        zIndex: 5,
    },
    paper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        color: theme.palette.primary.dark,
    },
    messageContainer: {
        height: '100%',
    },
    messagesRow: {
        maxHeight: '70vh',
        overflowY: 'auto',
    },
    newMessageRow: {
        width: '100%',
        padding: theme.spacing(0, 2, 1),
    },
    inputRow: {
        display: 'flex',
        alignItems: 'flex-end',
    },
    form: {
        width: '100%',
    },
    avatar: {
        margin: theme.spacing(1, 1.5),
    },
    listItem: {
        width: '80%',
    },
}));

const ChatUser = props => {
    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [lastMessage, setLastMessage] = useState(null);
    const { chatUser, getSelectedChatUser } = useContext(GlobalContext);
      const {sendMessages } = useContext(GlobalContext);
      const { chatMessages, getMessages } = useContext(GlobalContext);
      const { enqueueSnackbar, closeSnackbar } = useSnackbar();
const {loggedInUser,getLoggedInUser } = useContext(GlobalContext);
    // const getGlobalMessages = useGetGlobalMessages();
    // const sendGlobalMessage = useSendGlobalMessage();
    // const getConversationMessages = useGetConversationMessages();
    // const sendConversationMessage = useSendConversationMessage();

    let chatBottom = useRef(null);
    const classes = useStyles();
    const REACT_APP_SOCKET_IO_URL = process.env.REACT_APP_SOCKET_IO_URL;
    console.log(props.location,"props")
    useEffect(() => {
        getLoggedInUser();
        scrollToBottom();
        
        getSelectedChatUser()
        socketMessages();
        reloadMessages();
    }, [lastMessage, props.scope, props.conversationId]);
    
    //console.log(currentChatUser,"currentChatUser")
    // useEffect(() => {
    //     const socket = socketIOClient(REACT_APP_SOCKET_IO_URL,{transports: ['polling']});
    //     //const listenTo =`newMessage${props.user}`;    
    //     socket.on(props.user, data => setLastMessage(data));
    // }, [])



    const socketMessages = () => {

        console.log(chatUser,"props.user")
         const parsedLoginUser = JSON.parse(localStorage.getItem('uid'));
        const socket = socketIOClient(REACT_APP_SOCKET_IO_URL,{transports: ['websocket']});
        const listenTo =`${chatUser.receiver_id}${parsedLoginUser.id}`;  
        console.log(listenTo,"lis")
        if (chatUser.receiver_id !== null ) {  
        socket.on(listenTo, data =>{ setLastMessage(data);
            console.log(data,"scocket")
            enqueueSnackbar(`New Message ${data.data.author_username}`, {
                    variant: 'info',
                })
           } );
        }

    }; 

    const reloadMessages = () => {
        // if (props.scope === 'Global Chat') {
        //     getGlobalMessages().then(res => {
        //         setMessages(res);
        //     });
        // } else 

        if (props.location.state.users !== null ) {
            getMessages(props.location.state.users);
            setMessages(chatMessages.conversations)
            console.log(messages,"msg")
        } else {
            setMessages([]);
        }
    };

    const scrollToBottom = () => {
        chatBottom.current.scrollIntoView({ behavior: 'smooth' });
    };

     useEffect(scrollToBottom, [messages]);

    const handleSubmit = e => {
        e.preventDefault();
        if (props.scope === 'Global Chat') {
            // sendGlobalMessage(newMessage).then(() => {
            //     setNewMessage('');
            // });
        } else {
                  const postData = {

        //firstName: firstName,
        //lastName: lastName,
        //channel_id:2,
        receiver_id:props.location.state.users,
        username: 'Test',
        author_username: 'Test',
        message: newMessage
    }
            sendMessages(postData)
                setNewMessage('');
        }
    };

    return (
        <Grid  className={classes.root}>
            <Grid item xs={12} className={classes.headerRow}>
                <Paper className={classes.paper} square elevation={2}>
                    <Typography color="inherit" variant="h6">
                        Test
                    </Typography>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Grid container className={classes.messageContainer}>
                    <Grid item xs={12} className={classes.messagesRow}>
                        {chatMessages && (
                            <List>
                                {chatMessages.map(m => (
                                    <ListItem
                                        key={m.id}
                                        className={classes.listItem}
                                        alignItems="flex-start"
                                    >
                                        <ListItemAvatar
                                            className={classes.avatar}
                                        >
                                            <Avatar>H</Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={m.fromUsers.username}
                                            secondary={
                                                <React.Fragment>
                                                    {m.message}
                                                </React.Fragment>
                                            }
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        )}
                        <div ref={chatBottom} />
                    </Grid>
                    <Grid item xs={12} className={classes.inputRow}>
                        <form onSubmit={handleSubmit} className={classes.form}>
                            <Grid
                                container
                                className={classes.newMessageRow}
                                alignItems="flex-end"
                            >
                                <Grid item xs={11}>
                                    <TextField
                                        id="message"
                                        label="Message"
                                        variant="outlined"
                                        margin="dense"
                                        fullWidth
                                        value={newMessage}
                                        onChange={e =>
                                            setNewMessage(e.target.value)
                                        }
                                    />
                                </Grid>
                                <Grid item xs={1}>
                                    <IconButton type="submit">
                                        <SendIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>

    );
};

export default ChatUser;
