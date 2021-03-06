import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Grid from '@material-ui/core/Grid';
import AccountBoxOutlinedIcon from '@material-ui/icons/AccountBoxOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import { useHistory } from "react-router-dom";
import {useAuthDataContext} from "../helpers/AuthDataProvider"

const useStyles = makeStyles((theme) => ({
	root:{
margin:'10px'
},
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function MenuItem(){

const classes = useStyles();
const [value, setValue] = React.useState('login');
const { onLogout,onLogoutClearSession,authData } = useAuthDataContext();

  const handleChangeNav = (event, newValue) => {
    setValue(newValue);
  };
let history = useHistory()
const handleRoute = () => {
history.push("/login");	
};


const handleLogoutRoute = () =>{
	onLogout(false);
	onLogoutClearSession();
};

	return (
<Grid container direction="row" justify="flex-end" alignItems="center" spacing={1}>
<Grid item xs={12}  sm={3}>
    <BottomNavigation value={value} onChange={handleChangeNav} className={classes.root}>
	{ authData ? null : (<BottomNavigationAction label="Login" value="login" icon={<AccountBoxOutlinedIcon />} onClick={handleRoute} />)
      	}
      <BottomNavigationAction label="Favorites" value="favorites" icon={<FavoriteIcon />} />
      <BottomNavigationAction label="Nearby" value="nearby" icon={<LocationOnIcon />} />
      <BottomNavigationAction label="Logout" value="logout" icon={<ExitToAppOutlinedIcon />}  onChange={handleChangeNav}  onClick={handleLogoutRoute} />
    </BottomNavigation>
</Grid>
</Grid>
);		

}
