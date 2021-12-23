import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { getItems} from "../../Services/services";
import Grid from '@material-ui/core/Grid';

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


export const ViewItems = ({ products }) => {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;


  return (

    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
         {products.name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          adjective
        </Typography>
        <Typography variant="body2" component="p">
          {products.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>

  );
}

