import studentReducer from "./studentReducer";
import courseReducer from "./courseReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  studentState: studentReducer,
  courseState: courseReducer,
});

export default rootReducer;
