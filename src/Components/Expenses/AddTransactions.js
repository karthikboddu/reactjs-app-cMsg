import React, { useState,useContext,useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useForm, ErrorMessage } from "react-hook-form";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import { GlobalContext } from '../../Context/GlobalState';
import { useBetween } from "use-between";
import  TransactionsProvider  from '../../Context/TransactionsProvider';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },

}));

export default function AddTransactions() {

const classes = useStyles();
const { register, handleSubmit, errors } = useForm();
const { addTransactionsTo } = useContext(GlobalContext);
const { listId, expname, setExpListName } = useBetween(TransactionsProvider);
const { allTransactionsList,getTransactions } = useContext(GlobalContext);
  const onSubmit = (data) => {
    console.log(data);
          addTransactionsTo(data);
          getTransactions();
    }
   //  console.log(expname);
   //  const trans = ()=>{
   // expname: allTransactionsList.map(player => player.exp_list_id || player.exp_list_id === listId ? { ...player, ifActive: player.id === listId} : player)   
   //  }
   
	return (
    <Grid container  className={classes.root} direction="row" justify="flex-start" alignItems="center">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {listId}
        </Typography>
     
      <form noValidate >

              <TextField id="outlined-name" name="expname"
                label="Enter Name"
                type="name"
                inputRef={
                  register({
                    required: 'Name Required',
                  })
                }
                fullWidth
                helperText={errors.expname ? "Name Required" : ''}
                margin="normal"
                error={errors.expname ? true : false}
                variant="outlined" />

            <ErrorMessage errors={errors} name="email" >
              {({ message }) => <p>{message}</p>}
            </ErrorMessage>


              <TextField id="outlined-price"
                variant="outlined"
                name="amount"
                label="Enter Amount"
                inputRef={
                  register({
                    required: 'Amount Required',
                  })
                }
                type="number"
                helperText={errors.amount ? "Amount Required" : ''}
                error={errors.amount ? true : false}
                margin="normal"
                fullWidth />
            <ErrorMessage errors={errors} name="password" >
              {({ message }) => <p>{message}</p>}
            </ErrorMessage>
            <TextField id="outlined-price"
                variant="outlined"
                name="expListId" 
                inputRef={
                  register({
                    required: 'Amount Required',
                  })
                }
                value={listId} style={{display: 'none'}} />

      <Grid container>
        <Grid item >
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit(onSubmit)}
          >
            Add
          </Button>
          </Grid>
        <Grid item >
          <Button
            
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            
          >
            New
          </Button>
          </Grid>          
          </Grid>
          </form>
    </div>
  </Grid>
		);

}

