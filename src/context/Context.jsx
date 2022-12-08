import React, { useState, createContext, useReducer } from "react";

export const Context = createContext();

const ContextProvider = ({ children }) => {

    const [address, setAddress] = useState();
    
    const data = {
      address,
      setAddress,
    };
    return <Context.Provider value={data}>{children}</Context.Provider>;
  };
  
  export default ContextProvider;
  