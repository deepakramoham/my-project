import { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  console.log("appContextProvider rendered");

  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
