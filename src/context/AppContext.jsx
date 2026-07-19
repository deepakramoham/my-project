import { useState, createContext } from "react";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [count, setCount] = useState(0);

  return (
    <AppContext.Provider value={{ count, setCount }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
