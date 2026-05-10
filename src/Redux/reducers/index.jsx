// import studentReducer from "./studentReducer";
import studentReducer from "../../feature/students/studentSlice";
//import courseReducer from "./courseReducer";
import courseReducer from "../../feature/courses/courseSlice";
const rootReducer = {
  studentState: studentReducer,
  courseState: courseReducer,
};

export default rootReducer;
