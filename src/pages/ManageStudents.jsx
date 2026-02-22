import { useState, useRef, useEffect, useCallback } from "react";

import { AppContext } from "../context/AppContextProvider";
import { useContext } from "react";

import Table from "../components/Table";
import { useNavigate } from "react-router-dom";

const ManageStudents = () => {
  const { students, dispatch } = useContext(AppContext);

  const navigate = useNavigate();

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const formattedData = students?.map((student, index) => ({
      ...student,
      slNo: index + 1,
      skills: Array.isArray(student?.skills) ? student?.skills?.join(", ") : "",
    }));

    setTableData(formattedData);
  }, [students]);

  const handleEdit = (editStudent) => {
    navigate(`/students/update-student/${editStudent?.id}`);
    // setModalOpen(true);
    // const updateStudent = students?.find(
    //   (student) => student?.id === editStudent?.id,
    // );
    // setFormValues(updateStudent);
  };

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
        data={tableData}
        onAddClick={handleAdd}
      />
    </>
  );
};

export default ManageStudents;
