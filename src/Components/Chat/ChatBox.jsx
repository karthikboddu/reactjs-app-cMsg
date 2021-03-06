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
import Box from '@material-ui/core/Box';
import moment from 'moment';
// import {
//     useGetGlobalMessages,
//     useSendGlobalMessage,
//     useGetConversationMessages,
//     useSendConversationMessage,
// } from '../Services/chatService';

const useStyles = makeStyles(theme => ({
    root: {
        height: '100%',
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

const ChatBox = props => {
    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [lastMessage, setLastMessage] = useState(null);
      const {sendMessages } = useContext(GlobalContext);
      const { chatMessages, getMessages } = useContext(GlobalContext);
    // const getGlobalMessages = useGetGlobalMessages();
    // const sendGlobalMessage = useSendGlobalMessage();
    // const getConversationMessages = useGetConversationMessages();
    // const sendConversationMessage = useSendConversationMessage();

    let chatBottom = useRef(null);
    const classes = useStyles();
    const SOCKET_IO_URL = "http://localhost:4000";
  console.log(props.user,"id")
    useEffect(() => {
        reloadMessages();
        scrollToBottom();
    }, [lastMessage, props.scope, props.conversationId]);

    useEffect(() => {
        const socket = socketIOClient(SOCKET_IO_URL);
        //const listenTo =`newMessage${props.user}`;    
        socket.on(props.user, data => setLastMessage(data));
    }, [])

    const reloadMessages = () => {
        // if (props.scope === 'Global Chat') {
        //     getGlobalMessages().then(res => {
        //         setMessages(res);
        //     });
        // } else 
        if (props.scope !== null ) {
            getMessages(props.user);
            setMessages(chatMessages.conversations)
            console.log(messages,"msg")
        } else {
            setMessages([]);
        }
    };

    const scrollToBottom = () => {
        chatBottom.current.scrollIntoView({ behavior: 'smooth' });
    };

    const handleDate = date =>{
          return  moment(date).format('LLLL');
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
        channel_id:2,
        receiver_id:props.user,
        username: 'Test',
        author_username: 'Test',
        message: newMessage
    }
            sendMessages(postData)
                setNewMessage('');
        }
    };

    return (
        <Grid container className={classes.root}>
            <Grid item xs={12} className={classes.headerRow}>
                <Paper className={classes.paper} square elevation={2}>
                    <Typography color="inherit" variant="h6">
                        {props.scope}
                    </Typography>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Grid container className={classes.messageContainer}>
                    <Grid item xs={12} className={classes.messagesRow}>
                        {chatMessages && (
                            <List>
                                {chatMessages.map(m => (
                                     //const friendlyTimestamp = moment(m.created_at).format('LLLL');
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
                                            primary={
                                                <React.Fragment>
                                                    {m.fromUsers.username}
                                                </React.Fragment>          
                                            }
                                            secondary={
                                                <React.Fragment>
                                                    {m.message}
                                                </React.Fragment>
                                            }
                                        />                                
                                        <ListItemText
                                            secondary={handleDate(m.created_at)}
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

export default ChatBox;
