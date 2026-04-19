const courseState = {
  onload: false,
  loading: false,
  error: null,
  courses: [],
};

const courseReducer = (state = courseState, action) => {
  switch (action.type) {
    case "GET_ALL_COURSES_PENDING":
      return {
        ...state,
        loading: true,
      };

    case "GET_ALL_COURSES_SUCCESS":
      return {
        ...state,
        courses: [...action.payload],
        loading: false,
        onload: true,
      };
    case "GET_ALL_COURSES_FAILED":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "ADD_COURSE_SUCCESS":
      return {
        ...state,
        courses: [action.payload, ...state.courses],
      };
    case "ADD_COURSE_FAILED":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "UPDATE_COURSE_SUCCESS":
      return {
        ...state,
        courses: state.courses.map((course) =>
          course.id === action.payload.id ? action.payload : course,
        ),
      };
    case "UPDATE_COURSE_FAILED":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "DELETE_COURSE_SUCCESS":
      return {
        ...state,
        courses: state.courses.filter((c) => c.id !== action.payload),
      };
     case "DELETE_COURSE_FAILED":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const selectAllCourses = (state) => state.courseState.courses;

export default courseReducer;
