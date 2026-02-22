import { useState, useRef, useEffect, useCallback } from "react";

import { AppContext } from "../context/AppContextProvider";
import { useContext } from "react";
import Input from "../components/Input";
import Modal from "../components/Modal";
import RadioButton from "../components/RadioButton";
import CheckBox from "../components/CheckBox";
import Dropdown from "../components/Dropdown";
import Table from "../components/Table";

const ManageStudents = () => {
  const nameRef = useRef(null);
  const { students, courses, dispatch } = useContext(AppContext);
  const [courseOptions, setCourseOptions] = useState([]);
  /*   const [formValues, setFormValues] = useState({
    name: "",
    contact: "",
  }); */

  useEffect(() => {
    const options = courses?.map((course) => ({
      label: course?.courseTitle,
      value: course?.id,
    }));
    setCourseOptions(options);
  }, []);

  console.log(courseOptions);
  const [formValues, setFormValues] = useState({
    name: "",
    contact: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const [tableData, setTableData] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const formattedData = students?.map((student, index) => ({
      ...student,
      slNo: index + 1,
      skills: Array.isArray(student?.skills) ? student?.skills?.join(", ") : "",
    }));

    setTableData(formattedData);
  }, [students]);

  const handleEdit = (editStudent) => {
    setModalOpen(true);
    const updateStudent = students?.find(
      (student) => student?.id === editStudent?.id,
    );
    setFormValues(updateStudent);
  };

  const handleDelete = (id) => {
    dispatch({ type: "DELETE_STUDENT", payload: id });
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
      name: "",
      contact: "",
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
        dispatch({ type: "UPDATE_STUDENT", payload: formValues });
      } else {
        const newStudent = {
          id: crypto.randomUUID(),
          ...formValues,
        };
        dispatch({ type: "SET_STUDENTS", payload: newStudent });
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
      {modalOpen && (
        <Modal
          modalTitle={"Add Contact"}
          modalBody={
            <div className="p-2">
              <div className="mb-2">
                <Input
                  ref={nameRef}
                  name={"name"}
                  className={"my-input mb-4"}
                  value={formValues?.name || ""}
                  placeholder={"Enter your name"}
                  onChange={handleInputChange}
                  error={formErrors?.name}
                />
              </div>

              <div className="mb-2">
                <Input
                  name={"contact"}
                  value={formValues?.contact || ""}
                  onChange={handleInputChange}
                  placeholder="Contact Number . . ."
                  error={formErrors?.contact}
                />
              </div>

              <div>
                <RadioButton
                  label="Gender"
                  name={"gender"}
                  selectedValue={formValues?.gender || ""}
                  options={[
                    { label: "Male", value: "male" },
                    { label: "Female", value: "female" },
                    { label: "Other", value: "other" },
                  ]}
                  handleInputChange={handleInputChange}
                />
              </div>

              <div className="mb-2">
                <CheckBox
                  name={"skills"}
                  label={"Skills"}
                  selectedValues={formValues?.skills || []}
                  options={[
                    { label: "HTML", value: "html" },
                    { label: "CSS", value: "css" },
                    { label: "Javascript", value: "javascript" },
                  ]}
                  handleInputChange={handleInputChange}
                />
              </div>

              <div className="mb-2">
                <Dropdown
                  name={"course"}
                  label={"Courses"}
                  selectedValue={formValues?.course || ""}
                  options={courseOptions}
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

export default ManageStudents;
