import axios from 'axios';
import {getAuthToken} from './auth';
axios.defaults.credentials =true
function userLogin(email, password) {
    return axios.post(`${process.env.REACT_APP_API_URL}/api/login`,
        {
            email: email,
            password: password
        })

}

function userRegister(firstName, lastName, email, password) {
    /**
     * fetching registration data and sending request to backend
     */ 
    return axios.post(`${process.env.REACT_APP_API_URL}/api/register`, {

        //firstName: firstName,
        //lastName: lastName,
        username: firstName,
        email: email,
        password: password
    })
}

export function logout() {
    return axios.get('http://127.0.0.1:8000/api/logout', {
        headers: { 'Authorization': localStorage.getItem('token') }
    })
}



export function addItems(data) {
    return axios.post('http://127.0.0.1:8000/api/products',{

        //firstName: firstName,
        //lastName: lastName,
        name: data.name,
        price: data.price,
        quantity: data.quantity
    }, {
		headers: { 'Authorization': 'Bearer' + getAuthToken() }
    })
}


export async function getItems() {
    return await axios.get('http://127.0.0.1:8000/api/products', {
		headers: { 'Authorization': 'Bearer' + getAuthToken() }
    })
}

export {
    userRegister,
    userLogin
}
