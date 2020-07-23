import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import { useForm, ErrorMessage } from "react-hook-form";
import { userLogin,addItems } from "../../Services/services";
import { useHistory } from "react-router-dom";
import { setAuthToken } from "../../Services/auth";
import {getAuthToken,isLogin,useAuth}  from "../../Services/auth";
import {addChats} from  "../../Services/Chats/ChatService";
import {useAuthDataContext} from "../../helpers/AuthDataProvider"
import { AuthContext } from '../../Services/Authenticate'
import { GlobalContext } from '../../Context/GlobalState';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '10px'
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function AddItems() {

  const { user, onLogout,onLogin } = useAuthDataContext();
  //const [authenticated, usero] = useAuth(getAuthToken());
  //const { isAuthenticated, login } = useContext(AuthContext)
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm();
  const {sendMessages } = useContext(GlobalContext);
  const [state, setState] = React.useState({
    name: '',
    price: '',
    quantity: '',
    message: '',
  })
  let history = useHistory();


  //const [name, setName] = React.useState('Composed TextField');

  const handleChange = (event) => {

    setState({ ...state, [event.target.id]: event.target.value })
  }
  const onSubmit = (data) => {
    console.log(data);
 //addChats(data);
sendMessages(data)
	//addProducts(data)
  /*  addItems(data)
      .then((res) => {
        if (res.data) {

        } else {
          setState({ ...state, message: res.data.message })
        }

        console.log("responce from backend", res);
      })
      .catch((err) => {



        console.log(err);

      });
*/
  };




	return (


    <Grid container className={classes.root} direction="row" justify="center" alignItems="center">
     
      <form noValidate autoComplete="off">
        <Grid container spacing={3}>
          <Grid item sm={12}>
            <FormControl>
              <TextField id="outlined-name" name="name"
                label="Name"
                type="name"
                inputRef={
                  register({
                    required: 'Name Required',
                  })
                }
                fullWidth
                error={errors.name ? true : false}
                variant="outlined" />
            </FormControl>
            <ErrorMessage errors={errors} name="name" >
              {({ message }) => <p>{message}</p>}
            </ErrorMessage>
          </Grid>
        </Grid>




        {/* <div className={classes.margin}>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <AccountCircle />
            </Grid>
            <Grid item>
              <TextField id="input-with-icon-grid" label="With a grid" ref={register} />
            </Grid>
          </Grid>
        </div> */}

        <Grid container spacing={1}>
          <Grid item sm={12}>
            <Button variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>
              Add Item
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={1}>
          <Grid item sm={12}>
            <div>{state.message}</div>
          </Grid>
        </Grid>
      </form>

    </Grid>

  );

}

