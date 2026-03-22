const studentState = {
  onload: false,
  loading: false,
  error: null,
  students: [],
};

const studentReducer = (state = studentState, action) => {
  switch (action.type) {
    case "GET_STUDENTS_DATA_PENDING":
      return {
        ...state,
        loading: true,
      };

    case "GET_STUDENTS_DATA_SUCCESS":
      return {
        ...state,
        students: [...action.payload],
        loading: false,
        onload: true,
      };
    case "GET_STUDENTS_DATA_FAILED":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "POST_STUDENT_DATA_PENDING":
      return {
        ...state,
        loading: true,
      };
    case "POST_STUDENT_DATA_SUCCESS":
      return {
        ...state,
        loading: false,
        students: [...state.students, action.payload],
      };
    case "POST_STUDENT_DATA_FAILED":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "UPDATE_STUDENT":
      return {
        ...state,
        students: state.students.map((student) =>
          student.id === action.payload.id ? action.payload : student,
        ),
      };

    case "DELETE_STUDENT":
      return {
        ...state,
        students: state.students.filter((std) => std.id !== action.payload),
      };

    default:
      return state;
  }
};

export default studentReducer;
