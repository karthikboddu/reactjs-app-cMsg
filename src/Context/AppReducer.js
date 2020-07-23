export default (state, action) => {
  switch(action.type) {
    case 'GET_PRODUCTS':
      return {
        ...state,
        loading: false,
        products: action.payload
      }
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        products: state.products.filter(products => products._id !== action.payload)
      }
    case 'ADD_PRODUCTS':
      return {
        ...state,
        products: [...state.products, action.payload]
      }
    case 'PRODUCTS_ERROR':
      return {
        ...state,
        error: action.payload
      }
    case 'SEND_MSG':
	return{
	  ...state,
	  chatMessages:[action.payload,...state.chatMessages]
	}
    case 'GET_MSG':
	return{
	  ...state,
	  loading: false,
	  chatMessages: action.payload
	}
    default:
      return state;
  }
}
