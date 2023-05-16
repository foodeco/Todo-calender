import { createContext, useReducer } from 'react';

const Context = createContext(null);

export function MyContext({ children }) {
  const [state, dispatch] = useReducer(reducer, initState);
  console.log(state);
  return (
    <Context.Provider value={{ value: state, dispatch }}>
      {children}
    </Context.Provider>
  );
}

export default Context;

const initState = [
  {
    id: '',
    title: '',
    order: '',
  },
];
function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO': {
      return state.concat({
        id: action.id,
        title: action.title,
        order: action.order,
      });
    }
    case 'EDIT_TODO': {
      return state.filter((todo) => {
        if (todo.id === action.id) {
          todo.title = action.title;
        }
        return todo;
      });
    }
    case 'DEL_TODO': {
      return state.filter((todo) => todo.id !== action.id);
    }
    default: {
      return state;
    }
  }
}
