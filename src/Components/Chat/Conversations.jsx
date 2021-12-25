import React, { useState,useContext, useEffect } from 'react';
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
import { getRecentMessageByUser,setSeenCount } from '../../Services/Chats/ChatService';
import  { Redirect } from 'react-router-dom'
import {isMobile} from 'react-device-detect';
import { GlobalContext } from '../../Context/GlobalState';
import Badge from '@material-ui/core/Badge';
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
    const {setSelectedChatUser } = useContext(GlobalContext);
	const {recentChatMessages,getRecentMessagesByUser } = useContext(GlobalContext);
    // Returns the recipient name that does not
    // belong to the current user.
    const handleRecipient = (firstname,lastname) => {
        var fname = firstname.charAt(0);
        var lname = lastname.charAt(0);
        console.log(fname,lname,"ad")
       return fname.lname
        // for (let i = 0; i < recipients.length; i++) {
		
        //     if (
		
        //         recipients.user_id !==
        //         localStorage.getItem('uid')
        //     ) {
        //         return recipients;
        //     }
        // }
       
    };
    const handleButtonClick = c => {
    console.log("rec")

    setSeenCount(c.receiverUsers.id).then(res => getRecentMessagesByUser());
    if(isMobile){
            setSelectedChatUser(c);
            history.push({
                     pathname: `/chatuser/${c.receiverUsers.id}`,
                    state: { users: c.receiverUsers.id },
                    scope: { name: c.receiverUsers.username }
            });
    }
    setSelectedChatUser(c)
    }
    useEffect(() => {
       //getRecentMessagesByUser();
        getRecentMessagesByUser()

        
    }, [newConversation]);
 // getRecentMessagesByUser();
    useEffect(() => {
        setConversations(recentChatMessages)
        // let socket = socketIOClient("http://localhost:8000");
        // socket.on('messages', data => setNewConversation(data));

        // return () => {
        //     socket.removeListener('messages');
        // };
    }, []);

const defaultProps = {
  color: 'secondary',
  
};

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

            {recentChatMessages && (
                <React.Fragment>
                    {recentChatMessages.map(c => (
                        <ListItem
                            className={classes.listItem}
                            key={c.receiverUsers.id}
                            button
                            onClick={() => {
                                handleButtonClick(c);
                                props.setUser(c.receiverUsers.id);
                                props.setScope(
                                    c.receiverUsers.username
                                );
                            }}
                        >

                            <ListItemAvatar>
                                <Avatar>{c.receiverUsers.firstname}</Avatar>
                            </ListItemAvatar>                         
                            <ListItemText
                                primary={c.receiverUsers.username}
                                secondary={
                                    <React.Fragment>
                                        {c.message}
                                    </React.Fragment>
                                }
                            />
		<Badge badgeContent={c.notseen} {...defaultProps} />
                        </ListItem>
                    ))}
                </React.Fragment>
            )}
        </List>
    );
};

export default Conversations;
