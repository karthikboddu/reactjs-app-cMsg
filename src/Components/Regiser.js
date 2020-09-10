import React from 'react';
//import Snackbar from '@material-ui/core/Snackbar';
//import { FormGroup } from '@material-ui/core';
import { useForm, ErrorMessage } from 'react-hook-form';
//import Alert from '@material-ui/lab/Alert'
import FormControl from '@material-ui/core/FormControl';
// import FormHelperText from '@material-ui/core/FormHelperText';
//import Input from '@material-ui/core/Input';
//import InputLabel from '@material-ui/core/InputLabel';
//import OutlinedInput from '@material-ui/core/OutlinedInput';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
//import Container from '@material-ui/core/Container';
//import Paper from '@material-ui/core/Paper';
//import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { userRegister } from "../Services/services";
import CircularProgress from '@material-ui/core/CircularProgress';
//import Fab from '@material-ui/core/Fab';
//import CheckIcon from '@material-ui/icons/Check';
//import SaveIcon from '@material-ui/icons/Save';
import clsx from 'clsx';
import { green } from '@material-ui/core/colors';
import { useHistory } from "react-router-dom";
import { setAuthToken } from "../Services/auth";

export default function RegForm() {

  const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(0),
    },
    root: {
      margin: '10px',
      alignItems: 'center',
    },
    wrapper: {
      margin: theme.spacing(1),
      position: 'relative',
    },
    buttonSuccess: {
      backgroundColor: green[500],
      '&:hover': {
        backgroundColor: green[700],
      },
    },
    fabProgress: {
      color: green[500],
      position: 'absolute',
      top: -6,
      left: -6,
      zIndex: 1,
    },
    buttonProgress: {
      color: green[500],
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
    },
  }));
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm();
  let history = useHistory();
  const [state, setState] = React.useState({
    firstName: '',
    lastName: '',
    password: '',
    open: false,
  })
  console.log(state)
  React.useEffect(() => { setState({ open: true }) }, [errors])

  const handleChange = (event) => {
    console.log("open", register)
    setState({ ...state, [event.target.id]: event.target.value })
  }

  // const handleSBClose = (event, reason) => {
  //   if (reason === 'clickaway') {
  //     return
  //   }
  //   console.log("sb")
  //   setState({ ...state, open: false })
  // }

  const handleAddUser = (data) => {
    const { firstName, lastName, email, password } = state
    console.log(firstName, lastName, password, email)
    handleButtonClick()
    setSuccess(false);
    setLoading(true);
    userRegister(firstName, lastName, email, password)
      .then((res) => {
        if (res.data.status) {
          setSuccess(true);
          setLoading(false);
          setAuthToken(res.data);
          history.push("/home");
        } else {

        }

        console.log("responce from backend", res);
      })
      .catch((err) => {



        console.log(err);

      });

  }

  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef();

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 2000);
    }
  };


  return (
    <Grid container
      direction="column"
      justify="space-evenly"
      alignItems="center"  >
      <form className={classes.root} noValidate >
        <Grid container spacing={3}>
          <Grid item sm={12}>
            <FormControl>
              <TextField
                required
                name="firstName"
                inputRef={
                  register({
                    required: 'First Name Required',
                    maxLength: {
                      value: 50,
                      message: 'First Name must be less than 50 characters',
                    },
                    minLength: {
                      value: 1,
                      message: 'Last Name must be greater than 1 characters',
                    },
                    pattern: {
                      value: /[a-zA-z]/,
                      message: 'First Name must include only letters'
                    }
                  })
                }
                onChange={handleChange}
                id='firstName'
                label='First Name'
                variant='outlined'
                placeholder='First Name'
                size='small'
                error={errors.firstName ? true : false}

              />
            </FormControl>
            <ErrorMessage errors={errors} name="firstName" >
              {({ message }) => <p>{message}</p>}
            </ErrorMessage>

          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item sm={12}>
            <FormControl>
              <TextField
                required
                name="lastName"
                inputRef={
                  register({
                    required: 'Last Name Required',
                    maxLength: {
                      value: 50,
                      message: 'Last Name must be less than 50 characters',
                    },
                    minLength: {
                      value: 1,
                      message: 'Last Name must be greater than 1 characters',
                    },
                    pattern: {
                      value: /[a-zA-z]/,
                      message: 'Last Name must include only letters'
                    }
                  })
                }
                onChange={handleChange}
                id='lastName'
                label='Last Name'
                variant='outlined'
                placeholder='Last Name'
                size='small'
                error={errors.lastName ? true : false}
              />
            </FormControl>

            <ErrorMessage errors={errors} name="lastName" >
              {({ message }) => <p>{message}</p>}
            </ErrorMessage>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item sm={12}>
            <FormControl>
              <TextField
                required
                name="email"
                inputRef={
                  register({
                    required: 'email Required',
                    maxLength: {
                      value: 50,
                      message: 'email must be less than 50 characters',
                    },
                    minLength: {
                      value: 1,
                      message: 'email must be greater than 1 characters',
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                      message: 'Email not proper'
                    }
                  })
                }
                onChange={handleChange}
                id='email'
                label='Email'
                variant='outlined'
                placeholder='Email'
                size='small'
                error={errors.email ? true : false}
              />
            </FormControl>

            <ErrorMessage errors={errors} name="email" >
              {({ message }) => <p>{message}</p>}
            </ErrorMessage>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item sm={12}>
            <FormControl>
              <TextField
                required
                name="password"
                type="password"
                inputRef={
                  register({
                    required: 'Last Name Required',
                    maxLength: {
                      value: 50,
                      message: 'Last Name must be less than 50 characters',
                    },
                    minLength: {
                      value: 1,
                      message: 'Last Name must be greater than 1 characters',
                    },
                    pattern: {
                      value: /[a-zA-z]/,
                      message: 'Last Name must include only letters'
                    }
                  })
                }
                onChange={handleChange}
                id='password'
                label='Password'
                variant='outlined'
                placeholder='Password'
                size='small'
              />
            </FormControl>
            <ErrorMessage errors={errors} name="password" >
              {({ message }) => <p>{message}</p>}
            </ErrorMessage>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item sm={12}>
          {/*  <Button onClick={handleSubmit(handleAddUser)}>
              Sign Up
                </Button>
	*/}

            <div className={classes.wrapper}>
              <Button
                variant="contained"

                className={buttonClassname}
                disabled={loading}
                
		onClick={handleSubmit(handleAddUser)}
              >
                Sign Up
        </Button>
              {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
            </div>
          </Grid>
        </Grid>
      </form>

   {/*   <div className={classes.root}>
        <div className={classes.wrapper}>
          <Fab
            aria-label="save"
            color="primary"
            className={buttonClassname}
            onClick={handleButtonClick}
          >
            {success ? <CheckIcon /> : <SaveIcon />}
          </Fab>
          {loading && <CircularProgress size={68} className={classes.fabProgress} />}
        </div>

      </div> */}
    </Grid>
  )

}
