import studentReducer from "./studentReducer";
import courseReducer from "./courseReducer";

const rootReducer = {
  studentState: studentReducer,
  courseState: courseReducer,
};

export default rootReducer;
