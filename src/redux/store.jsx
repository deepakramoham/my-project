import { createStore } from "redux";

const counterState = {
  count: 0,
};

const counterReducer = (state = counterState, action) => {
  switch (action.type) {
    case "Increment":
      return {
        ...state,
        count: state.count + 1,
      };

    case "Decrement":
      return {
        ...state,
        count: state.count - 1,
      };

    default:
      return state;
  }
};

const store = createStore(counterReducer);

export default store;
