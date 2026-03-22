import { useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Table from "../components/Table";
import { useNavigate } from "react-router-dom";
import { selectAllCourses } from "../Redux/reducers/courseReducer";
import Loading from "../components/Loading";

const ManageStudents = () => {
  const dispatch = useDispatch();
  const { students, loading, onload } = useSelector(
    (state) => state.studentState,
  );
  const courses = useSelector(selectAllCourses);
  const navigate = useNavigate();
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      // setLoading(true);
      try {
        dispatch({ type: "GET_STUDENTS_DATA_PENDING" });
        // await new Promise((resolve) => setTimeout(resolve, 5000)); //simulating a network delay
        const response = await fetch("http://localhost:3500/students");
        const users = await response.json();
        if (users) {
          dispatch({ type: "GET_STUDENTS_DATA_SUCCESS", payload: users });
          // setLoading(false);
        }
      } catch (err) {
        console.log(err);
        dispatch({ type: "GET_STUDENTS_DATA_FAILED", payload: err });
      }
    };

    if (!onload) {
      fetchUsers();
    }
  }, [dispatch]);

  const handleEdit = (editStudent) => {
    navigate(`/students/update-student?id=${editStudent?.id}`);
  };

  const formattedData = useMemo(() => {
    return students?.map((student, index) => {
      const matchedCourse = courses?.find(
        (course) => course.id === student.course,
      );

      return {
        ...student,
        slNo: index + 1,
        skills: Array.isArray(student?.skills)
          ? student?.skills.join(", ")
          : "",
        course: matchedCourse ? matchedCourse.courseTitle : "",
      };
    });
  }, [students, courses]);

  const handleDelete = (id) => {
    dispatch({ type: "DELETE_STUDENT", payload: id });
  };

  const handleAdd = () => {
    navigate("/students/add-student");
  };

  const columnData = [
    { header: "Sl. NO", accessor: "slNo" },
    { header: "Name", accessor: "name" },
    { header: "Contact", accessor: "contact" },
    { header: "Gender", accessor: "gender" },
    { header: "Skills", accessor: "skills" },
    { header: "Course", accessor: "course" },
    {
      header: "Action",
      render: (student) => (
        <div className="d-flex gap-2">
          <button
            className="btn btn-secondary"
            onClick={() => handleEdit(student)}
          >
            Edit
          </button>

          <button
            className="btn btn-danger"
            onClick={() => handleDelete(student?.id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      {loading && <Loading />}
      <Table
        loading={loading}
        tableColumns={columnData}
        data={formattedData}
        onAddClick={handleAdd}
      />
    </>
  );
};

export default ManageStudents;
