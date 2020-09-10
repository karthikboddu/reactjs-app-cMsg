import React, { useState, useEffect } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import LanguageIcon from '@material-ui/icons/Language';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import socketIOClient from 'socket.io-client';
import { useHistory } from "react-router-dom";
import { getRecentMessagesByUser } from '../../Services/Chats/ChatService';
import  { Redirect } from 'react-router-dom'
const useStyles = makeStyles(theme => ({
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
    list: {
        maxHeight: '80vh',
        overflowY: 'auto',
    },
}));

const Conversations = props => {
    const classes = useStyles();
    const [conversations, setConversations] = useState([]);
    const [newConversation, setNewConversation] = useState(null);
    let history = useHistory();

    // Returns the recipient name that does not
    // belong to the current user.
    // const handleRecipient = recipients => {

    //     for (let i = 0; i < recipients.length; i++) {
		
    //         if (
		
    //             recipients.user_id !==
    //             localStorage.getItem('uid')
    //         ) {
    //             return recipients;
    //         }
    //     }
       
    // };

    useEffect(() => {
        getRecentMessagesByUser().then(res => setConversations(res.data.conversations));
    }, [newConversation]);

    useEffect(() => {
        let socket = socketIOClient("http://localhost:4000");
        socket.on('messages', data => setNewConversation(data));

        return () => {
            socket.removeListener('messages');
        };
    }, []);

    return (
        <List className={classes.list}>
            <ListItem
                classes={{ root: classes.subheader }}
                onClick={() => {
                    props.setScope('Global Chat');
                }}
            >
                <ListItemAvatar>
                    <Avatar className={classes.globe}>
                        <LanguageIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    className={classes.subheaderText}
                    primary="Global Chat"
                />
            </ListItem>
            <Divider />

            {conversations && (
                <React.Fragment>
                    {conversations.map(c => (
                        <ListItem
                            className={classes.listItem}
                            key={c.receiverUsers.id}
                            button
                            onClick={() => {
                                history.push({
                                       pathname: '/chatuser',
                                     
                                       state: { users: c.receiverUsers.id },
                                       scope: { name: c.receiverUsers.username }
                                   });
                                props.setUser(c.receiverUsers.id);
                                props.setScope(
                                    c.receiverUsers.username
                                );
                            }}
                        >

                            <ListItemAvatar>
                                <Avatar>AD</Avatar>
                            </ListItemAvatar>                         
                            <ListItemText
                                primary={c.receiverUsers.username}
                                secondary={
                                    <React.Fragment>
                                        {c.message}
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                    ))}
                </React.Fragment>
            )}
        </List>
    );
};

export default Conversations;
