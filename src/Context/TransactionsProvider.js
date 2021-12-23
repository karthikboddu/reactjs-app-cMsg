import React,{useState} from "react";

//const TransactionsProvider = React.createContext(false);
const TransactionsProvider = () => {
  const [expname, setExpListName] = useState("Abrar");
  const [listId, setExpListId] = useState(0);
  return {
    expname,
    setExpListName,
    listId,
    setExpListId
  };
};
// You can also import and use it like that
// export const { Provider, Consumer } = ToastProvider;

export default TransactionsProvider;
