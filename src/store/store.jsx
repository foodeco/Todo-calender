import { useContext } from 'react';
import { useState } from 'react';
import { createContext } from 'react';

const Context = createContext(null);

export function MyContext({ children }) {
  const [value, setValue] = useState(false);
  return (
    <Context.Provider value={{ value, setValue }}>{children}</Context.Provider>
  );
}

export default Context;
