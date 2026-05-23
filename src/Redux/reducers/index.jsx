// import studentReducer from "./studentReducer";
import studentReducer from "../../feature/students/studentSlice";
//import courseReducer from "./courseReducer";
import courseReducer from "../../feature/courses/courseSlice";
import userReducer from "../../feature/user/userSlice";
const rootReducer = {
  studentState: studentReducer,
  courseState: courseReducer,
  userState: userReducer,
};

export default rootReducer;
