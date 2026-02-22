import { createContext, useReducer } from "react";

export const AppContext = createContext();

const initialState = {
  students: [
    {
      id: "mbn",
      name: "Mubeena",
      gender: "female",
      skills: ["css", "javascript"],
      course: "react",
    },
    {
      id: "dpa",
      name: "Deepa",
      contact: "9900990099",
      gender: "female",
      skills: ["javascript"],
      course: "css",
    },
    {
      id: "jsh",
      name: "Jinshi",
      contact: "9900990022",
      gender: "female",
      skills: ["html", "javascript"],
      course: "react",
    },
    {
      id: "uma",
      name: "Uma",
      contact: "9900990033",
      gender: "female",
      skills: ["css", "javascript"],
      course: "javascript",
    },
  ]?.sort((a, b) => a?.name?.localeCompare(b?.name)),
  courses: [
    {
      id: "1",
      courseTitle: "html",
      paidCourse: "no",
    },
    {
      id: "2",
      courseTitle: "html",
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
