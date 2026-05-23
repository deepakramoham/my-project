import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
console.log("hi from store")
const store = configureStore({ reducer: rootReducer });

export default store;
