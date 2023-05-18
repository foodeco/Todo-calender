import { useState } from 'react';
import { createContext } from 'react';

const Context = createContext(null);

export function MyContext({ children }) {
  const [value, setValue] = useState(false);
  console.log('dark mode', value);
  return (
    <Context.Provider value={{ value, setValue }}>{children}</Context.Provider>
  );
}

export default Context;
