export const getAllStudents = () => async (dispatch) => {
  try {
    dispatch({ type: "GET_STUDENTS_DATA_PENDING" });
    // await new Promise((resolve) => setTimeout(resolve, 5000)); //simulating a network delay
    const response = await fetch("http://localhost:3500/students");
    const users = await response.json();
    if (users) {
      dispatch({
        type: "GET_STUDENTS_DATA_SUCCESS",
        payload: users,
      });
    }
  } catch (err) {
    console.log(err);
    dispatch({ type: "GET_STUDENTS_DATA_FAILED", payload: err });
  }
};

export const postStudentData = (data) => async (abc) => {
  try {
    abc({ type: "POST_STUDENT_DATA_PENDING" });
    const respnose = await fetch("http://localhost:3500/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await respnose.json();
    abc({ type: "POST_STUDENT_DATA_SUCCESS", payload: responseData });
  } catch (err) {
    abc({ type: "POST_STUDENT_DATA_FAILED", payload: err });
  }
};

export const updateStudentData = (studentId, data) => async (dispatch) => {
  try {
    dispatch({ type: "UPDATE_STUDENT_DATA_PENDING" });
    console.log(data);
    const response = await fetch(
      `http://localhost:3500/students/${studentId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    const updatedData = await response.json();

    dispatch({
      type: "UPDATE_STUDENT_DATA_SUCCESS",
      payload: updatedData,
    });
  } catch (err) {
    dispatch({
      type: "UPDATE_STUDENT_DATA_FAILED",
      payload: err,
    });
  }
};

export const deleteStudent = (id) => async (dispatch) => {
  try {
    dispatch({ type: "DELETE_STUDENT_DATA_PENDING" });
    const response = await fetch(`http://localhost:3500/students/${id}`, {
      method: "DELETE",
    });

    console.log(response);

    const result = await response.json();

    dispatch({ type: "DELETE_STUDENT_DATA_SUCCESS", payload: id });
  } catch (err) {
    dispatch({ type: "DELETE_STUDENT_DATA_FAILED", err });
  }
};
