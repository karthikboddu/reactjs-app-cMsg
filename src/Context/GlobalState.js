import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';
import {addItems,getItems} from '../Services/services';
import {addChats,getChatMessages,getChatMessagesByUser} from '../Services/Chats/ChatService';
// Initial state
const intialState = {
  products: [],
  chatMessages: [],
  error: null,
  loading: true
}


export const GlobalContext = createContext(intialState);


export const GlobalProvider = ({children}) =>{

  const [state,dispatch] = useReducer(AppReducer,intialState);


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
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: 'MSG_ERROR',
        payload: err
      });
    }
  }


    async function getMessages() {


    try {
      const res = await getChatMessagesByUser();
	console.log(res)
      dispatch({
        type: 'GET_MSG',
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: 'MSG_ERROR',
        payload: err
      });
    }
  }


  return (<GlobalContext.Provider value={{
    products: state.products,
    chatMessages: state.chatMessages,
    error: state.error,
    loading: state.loading,
    getProducts,
    addProducts,
    sendMessages,
    getMessages
  }}>
    {children}
  </GlobalContext.Provider>);













}
