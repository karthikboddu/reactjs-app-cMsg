import axios from 'axios';
import {getAuthToken} from '../auth';

export async function addChats(data) {
    return await axios.post('http://127.0.0.1:8000/api/channels/2/messages',{

        //firstName: firstName,
        //lastName: lastName,
	username: 'Test',
        message: data.name
    }
    )
}



export async function getChatMessages(){


    return await axios.get('http://127.0.0.1:8000/api/channels/2/messages',{

        //firstName: firstName,
        //lastName: lastName,
	//username: 'Test',
        //message: data.name
    }
    )





}




export async function getChatMessagesByUser(){


    return await axios.get('http://127.0.0.1:8000/api/chatMessages',{

        //firstName: firstName,
        //lastName: lastName,
	//username: 'Test',
        //message: data.name
    },{
		headers: { 'Authorization': 'Bearer' + getAuthToken() }
    }
    )





}
