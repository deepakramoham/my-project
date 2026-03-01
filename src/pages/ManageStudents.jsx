import { useState, useMemo, useEffect, useCallback } from "react";

import { AppContext } from "../context/AppContextProvider";
import { useContext } from "react";

import Table from "../components/Table";
import { useNavigate, useSearchParams } from "react-router-dom";

const ManageStudents = () => {
  //const { students, dispatch } = useContext(AppContext);
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams);
  const { students, courses, dispatch } = useContext(AppContext);

  const navigate = useNavigate();

  const handleEdit = (editStudent) => {
    navigate(`/students/update-student?id=${editStudent?.id}`);
    // setSearchParams({ id: editStudent?.id, name: editStudent?.name });
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
          ? student?.skills?.join(", ")
          : "",
        course: matchedCourse ? matchedCourse.courseTitle : "",
      };
    });

    // setTableData(formattedData);
  }, [students, courses]);
  const handleDelete = (id) => {
    dispatch({ type: "DELETE_STUDENT", payload: id });
  };
  const handleAdd = () => {
    // setModalOpen(true);
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
        <>
          <div className="d-flex gap-2">
            <div>
              <button
                className="btn btn-secondary"
                onClick={() => handleEdit(student)}
              >
                Edit
              </button>
            </div>
            <div>
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(student?.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </>
      ),
    },
  ];

  return (
    <>
      <Table
        tableColumns={columnData}
        data={formattedData}
        onAddClick={handleAdd}
      />
    </>
  );
};

export default ManageStudents;
