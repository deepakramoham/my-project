import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slice/counterSlice";

// const counterState = {
//   count: 0,
// };

// const counterReducer = (state = counterState, action) => {
//   switch (action.type) {
//     case "Increment":
//       return {
//         ...state,
//         count: state.count + 1,
//       };

//     case "Decrement":
//       return {
//         ...state,
//         count: state.count - 1,
//       };

//     default:
//       return state;
//   }
// };

// console.log(counterSlice.reducer);
// console.log(counterSlice.actions);

const store = configureStore({ reducer: counterReducer });

export default store;
