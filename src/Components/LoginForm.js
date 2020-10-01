import React,{useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
//import Container from '@material-ui/core/Container';
//import Paper from '@material-ui/core/Paper';
//import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import { useForm, ErrorMessage } from "react-hook-form";
import { userLogin } from "../Services/services";
import { useHistory } from "react-router-dom";
import { setAuthToken } from "../Services/auth";
import {useAuthDataContext} from "../helpers/AuthDataProvider"
import { GlobalContext } from '../Context/GlobalState';
// import { useCookies } from 'react-cookie'


const useStyles = makeStyles((theme) => ({
  root: {
    margin: '10px'
  },
  margin: {
    margin: theme.spacing(0),
  },
}));



export default function LoginTab() {

  const {onLogin } = useAuthDataContext();
  const {loggedInUser,getLoggedInUser } = useContext(GlobalContext);
  //const [authenticated, usero] = useAuth(getAuthToken());
  //const { isAuthenticated, login } = useContext(AuthContext)
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm();
  const [state, setState] = React.useState({
    email: '',
    password: '',
    message: '',
  })
  let history = useHistory();

// const [cookies, setCookie] = useCookies(['access_token', 'refresh_token'])

  //const [name, setName] = React.useState('Composed TextField');

  // const handleChange = (event) => {

  //   setState({ ...state, [event.target.id]: event.target.value })
  // }
  const onSubmit = (data) => {
    console.log(data);
    const { email, password } = state
    console.log(email, password, "s");
    userLogin(data.email, data.password)
      .then((res) => {
        if (res.data.status) {

          setAuthToken(res.data);
          //login(data);
          onLogin(true)
          getLoggedInUser()
          //localStorage.setItem('currentUser', res.data);	
          history.push("/home");
        } else {
          setState({ ...state, message: res.data.message })
        }

        console.log("responce from backend", res);
      })
      .catch((err) => {



        console.log(err);

      });
  };

  const handleRegister = () =>{

    history.push("/register");
  }


  return (


    <Grid container className={classes.root} direction="column"
      justify="space-evenly"
      alignItems="center">
     
      <form noValidate autoComplete="off">
        <Grid container spacing={3}>
          <Grid item sm={12}>
            <FormControl>
              <TextField id="outlined-Username" name="email"
                label="Email"
                type="email"
                inputRef={
                  register({
                    required: 'Email Required',
                    pattern: {
                      value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                      message: 'email not proper'
                    }
                  })
                }
                fullWidth
                error={errors.email ? true : false}
                variant="outlined" />
            </FormControl>
            <ErrorMessage errors={errors} name="email" >
              {({ message }) => <p>{message}</p>}
            </ErrorMessage>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item sm={12}>
            <FormControl>
              <TextField id="outlined-password"
                variant="outlined"
                name="password"
                label="Password"
                inputRef={
                  register({
                    required: 'Password Required',
                  })
                }
                type="password"
                error={errors.password ? true : false}
                fullWidth />
            </FormControl>
            <ErrorMessage errors={errors} name="password" >
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
              Login
            </Button>
          </Grid>
        </Grid>


        <Grid container spacing={1}>
          <Grid item sm={12}>
            <div>{state.message}</div>
          </Grid>
        </Grid>
      </form>
      <Grid container spacing={1}>
          <Grid item sm={12}>
            <Button variant="contained" color="primary" onClick={handleSubmit(handleRegister)}>
              Register
            </Button>
          </Grid>
        </Grid>
    </Grid>

  );
}

