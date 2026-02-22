import { createContext, useReducer } from "react";

export const AppContext = createContext();

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
    {
      id: "jsh",
      name: "Jinshi",
      contact: "9900990022",
      gender: "female",
      skills: ["html", "javascript"],
      course: "2",
    },
    {
      id: "uma",
      name: "Uma",
      contact: "9900990033",
      gender: "female",
      skills: ["css", "javascript"],
      course: "2",
    },
  ]?.sort((a, b) => a?.name?.localeCompare(b?.name)),
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

const appReducer = (state, action) => {
  switch (action.type) {
    case "SET_STUDENTS":
      return {
        ...state,
        students: [action.payload, ...state.students]?.sort((a, b) =>
          a.name.localeCompare(b.name),
        ),
      };

    case "UPDATE_STUDENT":
      return {
        ...state,
        students: state?.students?.map((student) =>
          student?.id === action.payload?.id ? action.payload : student,
        ),
      };

    case "DELETE_STUDENT":
      return {
        ...state,
        students: state.students.filter((std) => std.id !== action.payload),
      };
    case "SET_COURSE":
      return {
        ...state,
        courses: [action.payload, ...state.courses],
      };

    case "UPDATE_COURSE":
      return {
        ...state,
        courses: state?.courses?.map((course) =>
          course?.id === action.payload?.id ? action.payload : course,
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

const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  return (
    <AppContext.Provider
      value={{
        students: state.students,
        courses: state.courses,
        dispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
