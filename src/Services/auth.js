import axios from 'axios';
import { useState, useEffect } from 'react';

export const useAuth = auth => {
	const [authenticated, setAuthenticated] = useState(null);
	const [user, setUser] = useState(null);
  
	useEffect(() => { 
		//auth
		getAuth().then(res=>{
			console.log(res.data);
			if(res.data.user){
				setAuthenticated(true);
			}else{

			}
		})


	//   auth.isAuthenticated().then(isAuthenticated => {
	// 	if (isAuthenticated !== authenticated) {
	// 	  setAuthenticated(isAuthenticated);
	// 	}
	//   });
	});
  console.log(authenticated,"authenticated")
	useEffect(() => {
	  if (authenticated) {
		//  auth.getUser().then(setUser);

		 getAuth().then(res=>{
			
			if(res.data.user){
				setUser(res.data.user);
			}
		})
	  } else {
		setUser(null);
	  }
	}, [authenticated]);
  
	return [authenticated, user];
  };



export function getAuthToken() {
	var userInfo = JSON.parse(localStorage.getItem('currentUser'));
	if (userInfo) {
		return userInfo.token;
	}
}

export function setAuthToken(data) {

	localStorage.setItem('currentUser', JSON.stringify(data));
}

export function isLogin() {
	console.log(checkLogin(),"checkLogin");
	var login = checkLogin();
	return checkLogin();
}

 export  async function getAuth() {
    return await axios.get('http://127.0.0.1:8000/api/user', {
		headers: { 'Authorization': 'Bearer' + getAuthToken() }
    })
}

export function checkLogin(){

	axios.get('http://127.0.0.1:8000/api/user', {
		headers: { 'Authorization': 'Bearer' + getAuthToken() }
	}).then(response => {
		if (response.data) {
			console.log(response.data.user);
			
		} 
	})
	
}


export function authLogout(){
       

	axios.get('http://127.0.0.1:8000/api/logout', {
		headers: { 'Authorization': 'Bearer' + getAuthToken() }
	}).then(response => {
		if (response.data) {
			console.log(response.data);
			
		} 
	})
	 localStorage.removeItem('currentUser');

}
