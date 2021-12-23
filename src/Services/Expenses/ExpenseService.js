import axios from 'axios';
import {getAuthToken} from '../auth';

export async function addTransactionsSerice(data) {

    return await axios.post(`${process.env.REACT_APP_API_URL}/api/addExpensesItem`,data, {
        headers: { 'Authorization': 'Bearer' + getAuthToken() }
    }
    )
}


export async function getExpensesListByUser(){

    return await axios.get(`${process.env.REACT_APP_API_URL}/api/getExpensesList`,{
        headers: { 'Authorization': 'Bearer' + getAuthToken() }
    }
    )



}