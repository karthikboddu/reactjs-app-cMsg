import React, { useState, useContext,useEffect } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import socketIOClient from 'socket.io-client';
import { GlobalContext } from '../../Context/GlobalState';
import { getAllChatUsers } from '../../Services/Chats/ChatService';

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
    avatar: {
        margin: theme.spacing(0, 3, 0, 1),
    },
}));

const Users = props => {
    const classes = useStyles();
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState(null);
     const { allChatUsers, getAllChatUser } = useContext(GlobalContext);
    //const getUsers = getAllChatUsers();

    useEffect(() => {
	   getAllChatUser()
       getAllChatUsers()
       .then((res) => {
	console.log(res,"users")
 	  setUsers(res.data.user)
       })
      .catch((err) => {

      });


    }, [newUser]);

    useEffect(() => {
        const socket =  socketIOClient("http://localhost:4000");
        socket.on('users', data => {
            setNewUser(data);
        });
    }, []);

    return (
        <List className={classes.list}>
            {users && (
                <React.Fragment>
                    {users.map(u => (
                        <ListItem
                            className={classes.listItem}
                            key={u.id}
                            onClick={() => {
                                console.log(u,"u");
                                props.setUser(u.id);
                                props.setScope(u.username);
                            }}
                            button
                        >
                            <ListItemAvatar className={classes.avatar}>
                                <Avatar>AD</Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={u.username} />
                        </ListItem>
                    ))}
                </React.Fragment>
            )}
        </List>
    );
};

export default Users;
