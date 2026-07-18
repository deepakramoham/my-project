import { useMemo, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Table from "../../components/Table";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { deleteStudentData, getAllStudents } from "./studentActions";
import { getAllCourses } from "../courses/courseActions";
import Unauthorized from "../../pages/Unauthorized";
import { use } from "react";
import { AiOutlineConsoleSql } from "react-icons/ai";

const ManageStudents = () => {
  const dispatch = useDispatch();

  const { students, loading, onload } = useSelector(
    (state) => state.studentState,
  );

  const { onload: courseOnload } = useSelector((state) => state.courseState);

  const navigate = useNavigate();

  useEffect(() => {
    let promise;
    if (!courseOnload) {
      promise = dispatch(getAllCourses());
    }
    return () => {
      promise?.abort();
    };
  }, [dispatch, onload, courseOnload]);

  useEffect(() => {
    let promise;
    if (!onload) {
      promise = dispatch(getAllStudents());
    }
    return () => {
      promise?.abort();
    };
  }, [dispatch, onload]);

  const handleEdit = (editStudent) => {
    navigate(`/app/admin/students/update-student?id=${editStudent?.id}`);
  };

  const formattedData = useMemo(() => {
    return (
      Array.isArray(students) &&
      students?.map((student, index) => {
        return {
          ...student,
          slNo: index + 1,
          timeSlots: Array.isArray(student?.timeSlots)
            ? student?.timeSlots.join(", ")
            : "",
          course: student?.course?.courseTitle,
        };
      })
    );
  }, [students]);

  const handleDelete = (id) => {
    const result = confirm("Are you sure you want to delete this?");
    if (result) {
      dispatch(deleteStudentData(id));
    }
  };

  const handleAdd = () => {
    navigate("/app/admin/students/add-student");
  };

  const columnData = [
    { header: "Sl. NO", accessor: "slNo" },
    { header: "Name", accessor: "name" },
    { header: "Contact", accessor: "contact" },
    { header: "Education", accessor: "education" },
    { header: "Time Slots", accessor: "timeSlots" },
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
