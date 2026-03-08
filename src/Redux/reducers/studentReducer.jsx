const initialState = {
  students: [
    {
      id: "mbn",
      name: "Mubeena",
      gender: "female",
      skills: ["css", "javascript"],
      course: "2",
    },
    {
      id: "dpa",
      name: "Deepa",
      contact: "9900990099",
      gender: "female",
      skills: ["javascript"],
      course: "1",
    },
  ],
};

const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_STUDENTS":
      return {
        ...state,
        students: [...state.students, ...action.payload],
      };

    case "ADD_STUDENT":
      return {
        ...state,
        students: [action.payload, ...state.students],
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
