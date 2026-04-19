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
export const postCourseData = (courseData) => async (dispatch) => {
  try {
    const response = await fetch("http://localhost:3500/courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(courseData),
    });

    const data = await response.json();

    dispatch({
      type: "ADD_COURSE_SUCCESS",
      payload: data,
    });
  } catch (err) {
    console.log(err);
    dispatch({ type: "ADD_COURSE_FAILED", payload: err });
  }
};
export const updateCourse = (courseData) => async (dispatch) => {
  try {
    const response = await fetch(
      `http://localhost:3500/courses/${courseData.id}`,
      {
        method: "PUT", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(courseData),
      }
    );

    const data = await response.json();

    dispatch({
      type: "UPDATE_COURSE_SUCCESS",
      payload: data,
    });
  } catch (err) {
    console.log(err);
    dispatch({ type: "UPDATE_COURSE_FAILED", payload: err });
  }
};
export const deleteCourse = (id) => async (dispatch) => {
  try {
    await fetch(`http://localhost:3500/courses/${id}`, {
      method: "DELETE",
    });

    dispatch({
      type: "DELETE_COURSE_SUCCESS",
      payload: id,
    });
  } catch (err) {
    console.log(err);
    dispatch({ type: "DELETE_COURSE_FAILED", payload: err });
  }
};