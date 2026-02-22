import { useState, useRef, useEffect, useCallback } from "react";

import { AppContext } from "../context/AppContextProvider";
import { useContext } from "react";
import Input from "../components/Input";
import Modal from "../components/Modal";
import RadioButton from "../components/RadioButton";
import CheckBox from "../components/CheckBox";
import Dropdown from "../components/Dropdown";
import Table from "../components/Table";

const ManageCourses = () => {
  const nameRef = useRef(null);
  const { courses, dispatch } = useContext(AppContext);
  /*   const [formValues, setFormValues] = useState({
    name: "",
    contact: "",
  }); */
  const [formValues, setFormValues] = useState({
    courseTitle: "",
    paidCourse: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const [tableData, setTableData] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const formattedData = courses?.map((course, index) => ({
      ...course,
      slNo: index + 1,
    }));

    setTableData(formattedData);
  }, [courses]);

  const handleEdit = (editCourse) => {
    setModalOpen(true);
    const updatedCourse = courses?.find(
      (course) => course?.id === editCourse?.id,
    );
    setFormValues(updatedCourse);
  };

  const handleDelete = (id) => {
    dispatch({ type: "DELETE_COURSE", payload: id });
  };

  useEffect(() => {
    if (modalOpen) {
      nameRef?.current?.focus();
    }
  }, [modalOpen]);

  const handleInputChange = useCallback((event) => {
    const { name, value, type, checked, selectedOptions } = event.target;
    if (type === "checkbox") {
      console.log(event.target);
      if (checked) {
        setFormValues((prev) => ({
          ...prev,
          [name]: prev[name] ? [...prev[name], value] : [value],
        }));
      } else {
        setFormValues((prev) => ({
          ...prev,
          [name]: prev[name]?.filter((v) => v !== value),
        }));
      }
    } /* else if (type === "select-multiple") {
      const selectedOpt = Array.from(selectedOptions)?.map((opt) => opt.value);
      setFormValues((prev) => ({ ...prev, [name]: selectedOpt }));
    } */ else {
      setFormValues((prev) => ({ ...prev, [name]: value }));
      setFormErrors((prev) => ({
        ...prev,
        [name]: value ? "" : `${name} is required`,
      }));
    }
  }, []);

  const resetStates = () => {
    setModalOpen(!modalOpen);
    setFormErrors({});
    setFormValues({
      courseTitle: "",
      paidCourse: "",
    });
  };

  const validateFormValues = () => {
    const errors = {};
    Object.keys(formValues).forEach((key) => {
      if (!formValues[key]) {
        errors[key] = `${key} is required`;
      }
    });
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (validateFormValues()) {
      if (formValues.id) {
        dispatch({ type: "UPDATE_COURSE", payload: formValues });
      } else {
        const newCourse = {
          id: crypto.randomUUID(),
          ...formValues,
        };
        dispatch({ type: "SET_COURSE", payload: newCourse });
      }

      resetStates();
    }
  };
  const handleAdd = () => {
    setModalOpen(true);
  };

  const handleClose = () => setModalOpen(!modalOpen);

  const columnData = [
    { header: "Sl. NO", accessor: "slNo" },
    { header: "Course", accessor: "courseTitle" },
    { header: "Paid Course", accessor: "paidCourse" },
    {
      header: "Action",
      render: (course) => (
        <>
          <div className="d-flex gap-2">
            <div>
              <button
                className="btn btn-secondary"
                onClick={() => handleEdit(course)}
              >
                Edit
              </button>
            </div>
            <div>
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(course?.id)}
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
      {modalOpen && (
        <Modal
          modalTitle={"Add Course"}
          modalBody={
            <div className="p-2">
              <div className="mb-2">
                <Input
                  ref={nameRef}
                  name={"courseTitle"}
                  className={"my-input mb-4"}
                  value={formValues?.courseTitle || ""}
                  placeholder={"Course Title"}
                  onChange={handleInputChange}
                  error={formErrors?.courseTitle}
                />
              </div>

              <div>
                <RadioButton
                  label="Paid Course"
                  name={"paidCourse"}
                  selectedValue={formValues?.paidCourse || ""}
                  options={[
                    { label: "Paid", value: "yes" },
                    { label: "Free", value: "no" },
                  ]}
                  handleInputChange={handleInputChange}
                />
              </div>
            </div>
          }
          handleSave={handleSubmit}
          handleClose={handleClose}
          SaveButtonText={"Save"}
          CloseButtonText={"cancel"}
        />
      )}

      <Table
        tableColumns={columnData}
        data={tableData}
        onAddClick={handleAdd}
      />
    </>
  );
};

export default ManageCourses;
