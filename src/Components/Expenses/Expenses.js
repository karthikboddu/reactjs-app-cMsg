import React, { useState,useContext,useEffect } from 'react';
import  AddTransactions  from './AddTransactions';
import  TransactionsList  from './TransactionsList';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

export default function Expenses() {


return(
    <React.Fragment>            
      <Grid container>
       <Grid item xs={12} sm={12} md={4}>
	        <Paper square elevation={5}>
				<AddTransactions/>
			</Paper>
        </Grid>	

       <Grid item  md={8} >
			<TransactionsList/>
       </Grid>     

            </Grid>
    </React.Fragment>
	);






}
