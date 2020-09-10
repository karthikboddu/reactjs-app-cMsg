import React, { createContext, useState, useEffect, useContext } from "react";
import axios from 'axios';
import {getAuthToken,authLogout}  from "../Services/auth";
export const AuthDataContext = createContext(null);

const initialAuthData = {};

const AuthDataProvider = props => {
  const [authData, setAuthData] = useState(initialAuthData);
  //const [authenticated, user] = useAuth(getAuthToken());
  /* The first time the component is rendered, it tries to
   * fetch the auth data from a source, like a cookie or
   * the localStorage.
   */
  useEffect(() => {

		// getAuth().then(res=>{
			
		// 	if(res.data.user){
		// 		setAuthData(true);
		// 		console.log(res.data.user);
		// 	}else{

		// 	}
		// })
    const fetchData = async () => {
      const result = await axios(
        `${process.env.REACT_APP_API_URL}/api/user`,{
    headers: { 'Authorization': 'Bearer' + getAuthToken() }
    }
      );

      if(result.data.user){
        localStorage.setItem("uid",result.data.user.id)
        setAuthData(true);
      }else{
	setAuthData(false)
	}
      
    };

fetchData();
    //const currentAuthData = authenticated;
    //if (currentAuthData) {
    //  setAuthData(currentAuthData);
   // }
  }, []);
console.log(authData,"authData")
  const onLogout = newAuthData => setAuthData(newAuthData);
  const onLogoutClearSession = () =>{
	authLogout();
  };
  const onLogin = newAuthData => setAuthData(newAuthData);  

  //const authDataValue = useMemo({ ...authData, onLogin, onLogout }, [authData]);

  return <AuthDataContext.Provider value={{ authData, onLogin, onLogout,onLogoutClearSession }}  {...props} />;
};

export const useAuthDataContext = () => useContext(AuthDataContext);

export default AuthDataProvider;
