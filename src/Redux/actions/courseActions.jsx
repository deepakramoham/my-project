export const getAllCourses = () => async (dispatch) => {
  try {
    dispatch({ type: "GET_ALL_COURSES_PENDING" });
    // await new Promise((resolve) => setTimeout(resolve, 5000)); //simulating a network delay
    const response = await fetch("http://localhost:3500/courses");
    const courses = await response.json();
    if (courses) {
      dispatch({
        type: "GET_ALL_COURSES_SUCCESS",
        payload: courses,
      });
    }
  } catch (err) {
    console.log(err);
    dispatch({ type: "GET_ALL_COURSES_FAILED", payload: err });
  }
};
