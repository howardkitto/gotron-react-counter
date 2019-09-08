import React, {createContext, useContext, useReducer} from 'react';
export const GlobalState = createContext();
export const StateProvider = ({reducer, initialState, children}) =>(  
  <GlobalState.Provider value={useReducer(reducer, initialState)}>
    {children}
  </GlobalState.Provider>
);
export const useGlobalState = () => useContext(GlobalState)