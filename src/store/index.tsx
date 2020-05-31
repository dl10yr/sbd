// 必要なAPIの呼び出し
import React, { createContext, useReducer } from 'react';
interface IState {
  isOpen: boolean,
  variant: string,
  message: string,
}

interface IAction {
  type: "SET_NOTIFICATION" | "CLOSE_NOTIFICATION";
  variant: string,
  message: string,
}


type ContextType = {
  state: IState;
  dispatch: React.Dispatch<IAction>;
}

const initialState = {
  isOpen: false,
  variant: 'success',
  message: '',
};

const store = React.createContext({} as ContextType);

const { Provider } = store;
const StateProvider = ({ children }) => {
  function reducer(state: IState, action: IAction) {
    switch (action.type) {
      case 'SET_NOTIFICATION':
        return {
          ...state,
          isOpen: true,
          variant: action.variant,
          message: action.message,
        };
      case 'CLOSE_NOTIFICATION':
        return {
          ...state,
          isOpen: false,
        };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider }