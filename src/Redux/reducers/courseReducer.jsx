const courseState = {
  courses: [
    {
      id: "1",
      courseTitle: "HTML",
      paidCourse: "no",
    },
    {
      id: "2",
      courseTitle: "CSS",
      paidCourse: "no",
    },
  ],
};

const courseReducer = (state = courseState, action) => {
  switch (action.type) {
    case "SET_COURSE":
      return {
        ...state,
        courses: [action.payload, ...state.courses],
      };

    case "UPDATE_COURSE":
      return {
        ...state,
        courses: state.courses.map((course) =>
          course.id === action.payload.id ? action.payload : course,
        ),
      };

    case "DELETE_COURSE":
      return {
        ...state,
        courses: state.courses.filter((c) => c.id !== action.payload),
      };

    default:
      return state;
  }
};

export default courseReducer;
