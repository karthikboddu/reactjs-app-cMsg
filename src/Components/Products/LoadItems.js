import React, { useState, useEffect ,useContext} from 'react';
import { getItems} from "../../Services/services";
import {ViewItems} from './ViewItems';
import { GlobalContext } from '../../Context/GlobalState';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';



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

export default function LoadItems() {
  const classes = useStyles();
//const [products, setProducts] = useState([]);
const { products, getProducts } = useContext(GlobalContext);
console.log("view")
	useEffect(() => { 
		getProducts();
	  }, []);

  return (
    <>
    <h3>History</h3>
    <div className={classes.root}>
      <Grid container  direction="row" justify="center" alignItems="center" spacing={3}>
        {products.map(products => (
          <ViewItems key={products.id} products={products} />
        ))}
      </Grid>
    </div>
    </>
  )

}
