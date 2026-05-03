// import studentReducer from "./studentReducer";
import studentReducer from "../../feature/students/studentSlice";
import courseReducer from "./courseReducer";

const rootReducer = {
  studentState: studentReducer,
  courseState: courseReducer,
};

export default rootReducer;
