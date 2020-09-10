import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import {addItems,getItems} from '../Services/services';
import * as _ from "lodash";
import { useSnackbar } from 'notistack';
import {addChats,getAllChatUsers,getChatMessagesByUser} from '../Services/Chats/ChatService';
// Initial state
const intialState = {
  products: [],
  chatMessages: [],
  chatUser:'',
  allChatUsers:[],
  error: null,
  loading: true
}


export const GlobalContext = createContext(intialState);


export const GlobalProvider = ({children}) =>{

  const [state,dispatch] = useReducer(AppReducer,intialState);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  // Actions
  async function getProducts() {
    try {
      const res = await getItems();

      dispatch({
        type: 'GET_PRODUCTS',
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: 'PRODUCTS_ERROR',
        payload: err
      });
    }
  }

    async function addProducts(products) {


    try {
      const res = await addItems(products);

      dispatch({
        type: 'ADD_PRODUCTS',
        payload: res.data.product
      });
    } catch (err) {
      dispatch({
        type: 'PRODUCTS_ERROR',
        payload: err
      });
    }
  }

    async function sendMessages(message) {


    try {
      const res = await addChats(message);
      dispatch({
        type: 'SEND_MSG',
        payload: res.data.conversations
      });
    } catch (err) {
                    enqueueSnackbar('Could not send Message', {
                    variant: 'error',
                })
      dispatch({
        type: 'MSG_ERROR',
        payload: err
      });
    }
  }

  //   async function sendMessagesFromSocket(message) {


  //   try {
  //     const res = await addChats(message);

  //     dispatch({
  //       type: 'SEND_MSG',
  //       payload: res.data.messages
  //     });
  //   } catch (err) {
  //     dispatch({
  //       type: 'MSG_ERROR',
  //       payload: err
  //     });
  //   }
  // }


  async function getMessages(recv_id) {


    try {
      const res = await getChatMessagesByUser(recv_id);
      const sorted = _.sortBy(res.data.conversations, 'id');
      dispatch({
        type: 'GET_MSG',
        payload: sorted
      });
    } catch (err) {
              enqueueSnackbar('Could not load  Chat', {
                    variant: 'error',
                })
      dispatch({
        type: 'MSG_ERROR',
        payload: err
      });
    }
  }

   async function setSelectedChatUser(data) {


    try {
      localStorage.setItem("chatUser",data);
      dispatch({
        type: 'SET_CHATUSER',
        payload: data
      });
    } catch (err) {
            enqueueSnackbar('Could not load setSelectedChatUser', {
                    variant: 'error',
                })
      dispatch({
        type: 'MSG_ERROR',
        payload: err
      });
    }
  }


    async function getSelectedChatUser() {


    try {
      const data = localStorage.getItem("chatUser");

       console.log(data,"data");
      dispatch({
        type: 'GET_CHATUSER',
        payload: data
      });
    } catch (err) {
                    enqueueSnackbar('Could not load getSelectedChatUser', {
                    variant: 'error',
                })
      dispatch({
        type: 'MSG_ERROR',
        payload: err
      });
    }
  }

  async function getAllChatUser() {


    try {
      const res = await getAllChatUsers();
      dispatch({
        type: 'GET_ALLCHATUSER',
        payload: res.data.user
      });
    } catch (err) {
                enqueueSnackbar('Could not load getAllChatUser', {
                    variant: 'error',
                })
      dispatch({
        type: 'MSG_ERROR',
        payload: err
      });
    }
  }


  return (<GlobalContext.Provider value={{
    products: state.products,
    chatMessages: state.chatMessages,
    chatUser:state.chatUser,
    allChatUsers:state.allChatUsers,
    error: state.error,
    loading: state.loading,
    getProducts,
    addProducts,
    sendMessages,
    getMessages,
    getSelectedChatUser,
    setSelectedChatUser,
    getAllChatUser
  }}>
    {children}
  </GlobalContext.Provider>);













}
