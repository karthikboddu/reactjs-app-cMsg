import axios from 'axios';
import {getAuthToken} from '../auth';

export async function addChats(data) {
    console.log("Data",data)
    return await axios.post(`${process.env.REACT_APP_API_URL}/api/messages`,data, {
        headers: { 'Authorization': 'Bearer' + getAuthToken() }
    }
    )
}



export async function getChatMessages(){


    return await axios.get(`${process.env.REACT_APP_API_URL}/api/channels/2/messages`,{

        //firstName: firstName,
        //lastName: lastName,
	//username: 'Test',
        //message: data.name
    }
    )





}




export async function getChatMessagesByUser(id){


    return await axios.get(`${process.env.REACT_APP_API_URL}/api/conversations/query/`+id,{
		headers: { 'Authorization': 'Bearer' + getAuthToken() }
    }
    )



}
export async function getRecentMessageByUser(){
    console.log("________________________________________")

    return await axios.get(`${process.env.REACT_APP_API_URL}/api/conversations/getRecentMessagesByUser`,{
        headers: { 'Authorization': 'Bearer' + getAuthToken() }
    }
    )



}


export async function getAllUsersChatMessages(){


    return await axios.get(`${process.env.REACT_APP_API_URL}/api/getAllUserchatMessages`,{
		headers: { 'Authorization': 'Bearer' + getAuthToken() }
    }
    )

}

export async function getAllChatUsers(){


    return await axios.get(`${process.env.REACT_APP_API_URL}/api/getAllUsers`,{
        headers: { 'Authorization': 'Bearer' + getAuthToken() }
    }
    )

}






export async function setSeenCount(id) {
    
    return await axios.get(`${process.env.REACT_APP_API_URL}/api/conversations/query/seen/`+id, {
        headers: { 'Authorization': 'Bearer' + getAuthToken() }
    }
    )
}


