import React, { useState,useContext,useEffect } from 'react';
import { GlobalContext } from '../../Context/GlobalState';
import Grid from '@material-ui/core/Grid';
import {TransactionListItems} from './TransactionListItems'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export default function TransactionsList() {

const useStyles = makeStyles((theme) => ({
  root: {

 margin: '10px'
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
const { allTransactionsList,getTransactions } = useContext(GlobalContext);
const classes = useStyles();

	useEffect(() => { 
		getTransactions();
	  }, []);

return (

	<div className={classes.root}>
      {allTransactionsList && (
      <Grid container  >
        <Card className={classes.root}>

        {allTransactionsList.map(transactions => (
          <TransactionListItems key={transactions.id} transactions={transactions} />
        ))}
        </Card>
      </Grid>
      )}
    </div>

	);



}