const courseState = {
  courses: [
    {
      id: "0c8e84ca-6607-46d6-baa2-457ad06a1ebf",
      courseTitle: "Javascript",
      paidCourse: "no",
    },
    {
      id: "db120242-f322-41cf-b7eb-8c0ad2a24eca",
      courseTitle: "CSS",
      paidCourse: "no",
    },
    {
      id: "abf04cd9-f02e-43ef-a9d9-1c725d2f845b",
      courseTitle: "HTML",
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

export const selectAllCourses = (state) => state.courseState.courses;

export default courseReducer;
