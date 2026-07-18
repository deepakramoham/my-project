import { useMemo, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Table from "../../components/Table";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
// import { deleteStudentData, getAllStudents } from "./studentActions";
//import { getAllCourses } from "../../Redux/actions/courseActions";
// import { getAllCourses } from "../courses/courseActions";
import Unauthorized from "../../pages/Unauthorized";
import { use } from "react";
import { AiOutlineConsoleSql } from "react-icons/ai";

let studentPromise = null;
let stdData = null;

const ManageStudents = () => {
  const dispatch = useDispatch();

  const { students, loading, onload } = useSelector(
    (state) => state.studentState,
  );

  const { onload: courseOnload } = useSelector((state) => state.courseState);

  const navigate = useNavigate();

  useEffect(() => {
    // let promise;
    // if (!courseOnload) {
    //   promise = dispatch(getAllCourses());
    // }
    // return () => {
    //   promise?.abort();
    // };
  }, [dispatch, onload, courseOnload]);

  const getStudentsDetails = async () => {
    if (!studentPromise) {
      await new Promise((resolve)=>setTimeout(resolve,2000));
      studentPromise = fetch(
        "https://coursemaster-backend-9wxk.onrender.com/students",
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySW5mbyI6eyJpZCI6IjY5N2ExNzM4OGI4YzI0M2FiNTMyMjZhYyIsInJvbGVzIjoxMTAwfSwiaWF0IjoxNzg0MzcyNTg1LCJleHAiOjE3ODQzNzQzODV9.fMmE8zYUBiKwzfhVt0c6gop4Dc8mSBNqulOAATMVe94`,
          },
        },
      ).then((response) => response.json());
    }
    return studentPromise;
  };

  if (!stdData) {
    stdData = use(getStudentsDetails());
    
  }

  // useEffect(() => {
  //   const getAllStudentsData = async () => {
  //     try {
  //       setLoadingStudents(true);

  //       const response = await fetch(
  //         "https://coursemaster-backend-9wxk.onrender.com/students",
  //         {
  //           headers: {
  //             Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySW5mbyI6eyJpZCI6IjY5N2ExNzM4OGI4YzI0M2FiNTMyMjZhYyIsInJvbGVzIjoxMTAwfSwiaWF0IjoxNzg0MzcwNzMzLCJleHAiOjE3ODQzNzI1MzN9.HOlXqpPLAEcQ9dvz-qag6D5E8YC_5RZ7AbsLLTab490`,
  //           },
  //         },
  //       );
  //       const data = await response.json();
  //       setStudentData(data);
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       setLoadingStudents(false);
  //     }
  //   };

  //   getAllStudentsData();
  // }, []);

  useEffect(() => {
    // let promise;
    // if (!onload) {
    //   promise = dispatch(getAllStudents());
    // }
    // return () => {
    //   promise?.abort();
    // };
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
      {/* {loading && <Loading />} */}
      {/* <Table
        loading={loading}
        tableColumns={columnData}
        data={formattedData || []}
        onAddClick={handleAdd}
      /> */}

      <div>
        {stdData?.map((student) => (
          <div key={student?._id}>{JSON.stringify(student)}</div>
        ))}
      </div>
    </>
  );
};

export default ManageStudents;
