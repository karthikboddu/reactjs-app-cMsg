import React, { useEffect ,useContext} from 'react';
//import { getItems} from "../../Services/services";

import { GlobalContext } from '../../Context/GlobalState';
//import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
//import BottomBar from './BottomBar';
import './Chats.css';
import io from 'socket.io-client';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {

 margin: '50px'
  },
  margin: {
    margin: theme.spacing(0),
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));







export default function FetchChats(){



  const classes = useStyles();
//const [products, setProducts] = useState([]);
const { chatMessages, getMessages } = useContext(GlobalContext);
//const { receiver_id, setReceiver_id } = useState('1');
console.log("view")
	useEffect(() => { 
    const socket = io('http://localhost:4000');

    socket.on('laravel_database_N:App\\Events\\MessageSent', (msg) => {
console.log("msg",msg)
    });

		getMessages();
	  }, [getMessages]);


  return (
    <>
      <h3>History</h3>
    <div className={classes.root}>
      <Paper  elevation={3} >
 	{chatMessages.map(key=>(

                        <div   key={key.id}>
		                                    <Typography variant="caption" className="name">
                                        {key.user_id}
                                        </Typography>
                                      <Typography variant="body1" className="content">
                                      {key.message}
                                      </Typography>
                                       
                                 
                        </div>


	))}
      </Paper>
    </div>
    </>
  )


}
