import { useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Table from "../../components/Table";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import {
  deleteStudentData,
  getAllStudents,
} from "./studentActions";
//import { getAllCourses } from "../../Redux/actions/courseActions";
import { getAllCourses } from "../courses/courseActions";
const ManageStudents = () => {
  const dispatch = useDispatch();

  const { students, loading, onload, error } = useSelector(
    (state) => state.studentState,
  );
  console.log(students, loading, onload, error);
  const { courses, onload: courseOnload } = useSelector(
    (state) => state.courseState,
  );

  const navigate = useNavigate();
  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const controller = new AbortController();
  //   if (!courseOnload) {
  //     dispatch(getAllCourses(controller));
  //   }

  //   return () => {
  //     controller.abort();
  //   };
  // }, [dispatch, courseOnload]);
useEffect(() => {
  let promise;

  if (!onload) {
    promise = dispatch(getAllCourses());
  }

  return () => {
    promise?.abort();
  };
}, [dispatch, onload]);
  useEffect(() => {
    // if (!courseOnload) {
    //   dispatch(getAllCourses());
    // }

    let promise;
    if (!onload) {
      promise = dispatch(getAllStudents());
    }

    return () => {
      promise?.abort();
    };
  }, [dispatch, onload]);

  const handleEdit = (editStudent) => {
    navigate(`/students/update-student?id=${editStudent?.id}`);
  };

  const formattedData = useMemo(() => {
    return (
      Array.isArray(students) &&
      students?.map((student, index) => {
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
      })
    );
  }, [students, courses]);

  const handleDelete = (id) => {
    const result = confirm("Are you sure you want to delete this?");
    if (result) {
      dispatch(deleteStudentData(id));
    }
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
        data={formattedData || []}
        onAddClick={handleAdd}
      />
    </>
  );
};

export default ManageStudents;
