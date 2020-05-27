import React, { createContext, useContext, useReducer } from 'react';

const StateContext = createContext();

export const StateProvider = ({ reducer, children }) => (
  <StateContext.Provider value={useReducer(reducer, reducer(undefined, {}))}>
    {children}
  </StateContext.Provider>
);

export const useAppContext = () => {
  const [ state, dispatch ] = useContext(StateContext);

  const modifiedDispatch = (action) => {
    if (typeof action === "function") {
      action(dispatch);
    } else {
      dispatch(action)
    }
  };

  return [ state, modifiedDispatch ];
}

export const useMapContext = (mapState, mapDispatch) => {
  const [ state, dispatch ] = useAppContext();
  return {
    ...(typeof mapState === 'function' ? mapState(state) : {}),
    ...(typeof mapDispatch === 'function' ? mapDispatch(dispatch) : {})
  }
}