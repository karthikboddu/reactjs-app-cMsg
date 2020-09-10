import React, { useState, useEffect } from 'react';
// import AddItems from './AddItems';
// import LoadItems from './LoadItems';
import LoginTab from './LoginForm';
import RegForm from './Regiser';
//import Container from '@material-ui/core/Container';
import { useAuthDataContext }  from '../helpers/AuthDataProvider';
import history from '../helpers/history';
import ChatHome from '../Screens/ChatHome';
import Grid from '@material-ui/core/Grid';
const Homescreen = () => {
    const [page, setPage] = useState('login');
 	const {authData } = useAuthDataContext()
    useEffect(() => {
console.log(authData,"true");
        if (authData) {
            history.push('/chats');
		setPage('chats');
        }
    }, [authData]);

    const handleClick = location => {
        setPage(location);
    };

    let Content;

    if (page === 'login') {
        Content = <LoginTab handleClick={handleClick} />;
    } else if(page ==='chats') {
        Content = <ChatHome handleClick={handleClick} />;
    }else {
        Content = <RegForm handleClick={handleClick} />;
    }
	//<div><AddItems/>
	//	<LoadItems/>
		//</div>
    return (
        <Grid component="main" maxwidth="xs">
            {Content}
        </Grid>



    );
};

export default Homescreen;



