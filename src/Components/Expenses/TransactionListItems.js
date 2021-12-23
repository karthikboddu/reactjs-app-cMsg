import React, { useState,useContext,useEffect } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Box from '@material-ui/core/Box';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { useBetween } from "use-between";
import  TransactionsProvider  from '../../Context/TransactionsProvider';

export const TransactionListItems = ({ transactions }) => {


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
  padding:{
  	margin:'0'
  }
}));
const classes = useStyles();
const { listId,setExpListId } = useBetween(TransactionsProvider);
const { expname, setExpListName } =  useBetween(TransactionsProvider);

return(
	 <div>
		{transactions && (  <div>
			<Card className={classes.root}>

				{transactions.exp_list_name && ( 	 
			<Button  >
				{transactions.exp_list_name.map(transactionsExpName => (
				<Box key={transactionsExpName.id} component="span" m={1} onClick={() => setExpListId(transactionsExpName.id)} >
						{transactionsExpName.expense_user_list_names}		  
				</Box>  
				))}
			<EditOutlinedIcon/>
			</Button>
			)}
			<List>
			{transactions.expenses.map(transactions => (
			
    						
                                    <ListItem
                                        key={transactions.id}
                                        className={classes.listItem}
                                        alignItems="flex-start"
                                    >
								<Box component="span" m={1}>
								 Name : 
								</Box>                                    
                                    <ListItemText
                                            primary={transactions.expname}
                                            secondary={
                                                <React.Fragment>
                                                   
                                                </React.Fragment>
                                            }
                                        />
								<Box component="span" m={1}>
								 Amount : 
								</Box>                                          
                                    <ListItemText
                                            primary={transactions.amount}
                                            secondary={
                                                <React.Fragment>
                                                   
                                                </React.Fragment>
                                            }
                                        />                                        
                                    </ListItem>    

		    
		    
		     ))}
<Divider />

			 					<ListItem>  
								<Box component="span" m={1}>
								 Income : 
								</Box>                                          
                                    <ListItemText
                                            primary={transactions.income}
                                            secondary={
                                                <React.Fragment>
                                                   
                                                </React.Fragment>
                                            }
                                        />   
 
								<Box component="span" m={1}>
								 Expenses :
								</Box>                                          
                                    <ListItemText
                                            primary={transactions.expense}
                                            secondary={
                                                <React.Fragment>
                                                   
                                                </React.Fragment>
                                            }
                                        />                                                                               
                                    </ListItem>   
                                      
                                     

			</List>
			 
			</Card>
			</div>
		     )}

		</div>
);




}
