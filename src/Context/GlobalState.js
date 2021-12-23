import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import {addItems,getItems} from '../Services/services';
import * as _ from "lodash";
import { useSnackbar } from 'notistack';
import {addChats,getAllChatUsers,getChatMessagesByUser,getRecentMessageByUser} from '../Services/Chats/ChatService';
import {addTransactionsSerice,getExpensesListByUser} from  '../Services/Expenses/ExpenseService';
// Initial state
const intialState = {
  products: [],
  chatMessages: [],
  recentChatMessages:[],
  chatUser:'',
  loggedInUser:'',
  allChatUsers:[],
  allTransactionsList:[],
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

    async function addProducts(products,save) {


    try {
      if(save=="Y"){
        const res = await addItems(products);
      }

      dispatch({
        type: 'ADD_PRODUCTS',
        payload: products
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
      localStorage.setItem("chatUser",JSON.stringify(data));
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

  async function setLoggedInUser(data){
        try {
      dispatch({
        type: 'SET_LOGGEDUSER',
        payload: data
      });
    } catch (err) {
      enqueueSnackbar('Could not load setLoggedInUser', {
                    variant: 'error',
                })
      dispatch({
        type: 'MSG_ERROR',
        payload: err
      });
    }
  }

  async function getLoggedInUser(){

    try {
      const data = localStorage.getItem("uid");
      //localStorage.remoteItem('uid')
      dispatch({
        type: 'GET_LOGGEDUSER',
        payload: data
      });
    } catch (err) {
      enqueueSnackbar('Could not load getLoggedInUser', {
                    variant: 'error',
                })
      dispatch({
        type: 'MSG_ERROR',
        payload: err
      });
    }
  }

    async function getRecentMessagesByUser(){

    try {
      const res = await getRecentMessageByUser();

      console.log(res,"%%%%%%%")
      //localStorage.remoteItem('uid')
      dispatch({
        type: 'GET_RECENTMSG',
        payload: res.data.conversations
      });
    } catch (err) {
      enqueueSnackbar('Could not load getRecentMessagesByUser', {
                    variant: 'error',
                })
      dispatch({
        type: 'MSG_ERROR',
        payload: err
      });
    }
  }

  async function addTransactionsTo(items) {


    try {

        const res = await addTransactionsSerice(items);

        dispatch({
          type: 'ADD_TRANSACTIONS',
          payload: res.data
        });
    } catch (err) {
      dispatch({
        type: 'TRANSACTIONS_ERROR',
        payload: err
      });
    }
  }

  async function getTransactions() {
    try {
      const res = await getExpensesListByUser();

      dispatch({
        type: 'GET_TRANSACTIONS',
        payload: res.data.expensesuserList
      });
    } catch (err) {
      dispatch({
        type: 'TRANSACTIONS_ERROR',
        payload: err
      });
    }
  }

  return (<GlobalContext.Provider value={{
    products: state.products,
    chatMessages: state.chatMessages,
    recentChatMessages: state.recentChatMessages,
    chatUser:state.chatUser,
    loggedInUser:state.loggedInUser,
    allChatUsers:state.allChatUsers,
    error: state.error,
    loading: state.loading,
    getProducts,
    addProducts,
    sendMessages,
    getMessages,
    getSelectedChatUser,
    setSelectedChatUser,
    getAllChatUser,
    setLoggedInUser,
    getLoggedInUser,
    getRecentMessagesByUser,
    getTransactions,
    addTransactionsTo,
    allTransactionsList: state.allTransactionsList
  }}>
    {children}
  </GlobalContext.Provider>);













}
