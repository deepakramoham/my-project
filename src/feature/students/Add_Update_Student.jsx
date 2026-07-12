import Input from "../../components/Input";
import RadioButton from "../../components/RadioButton";
import CheckBox from "../../components/CheckBox";
import Dropdown from "../../components/Dropdown";

// import { useState, useRef, useEffect, useContext, useCallback } from "react";
// import { AppContext } from "../context/AppContextProvider";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useNavigate, useSearchParams } from "react-router-dom";
import { postStudentData, updateStudentData } from "./studentActions";
import { getAllCourses } from "../courses/courseActions";

const Add_Update_Student = () => {
  const nameRef = useRef(null);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  // const { students, courses, dispatch } = useContext(AppContext);

  const { students } = useSelector((state) => state.studentState);
  const { courses, onload } = useSelector((state) => state.courseState);

  const [searchParams] = useSearchParams();
  const studentId = searchParams.get("id");

  useEffect(() => {
    if (!onload) {
      dispatch(getAllCourses());
    }
  }, [dispatch, onload]);

  useEffect(() => {
    nameRef?.current?.focus();
  }, []);

  const [formValues, setFormValues] = useState({
    name: "",
    contact: "",
    course: "",
  });

  useEffect(() => {
    if (studentId) {
      const studentToEdit = students?.find(
        (student) => student.id === studentId,
      );

      if (studentToEdit) {
        setTimeout(() =>
          setFormValues({
            ...studentToEdit,
            course: studentToEdit?.course?.id,
          }),
        );
      }
    }
  }, [studentId, students]);

  const [formErrors, setFormErrors] = useState({});

  const courseOptions = useMemo(() => {
    const options = courses?.map((course) => ({
      label: course?.courseTitle,
      value: course?.id,
    }));
    return options;
  }, [courses]);

  const handleInputChange = useCallback((event) => {
    const { name, value, type, checked } = event.target;

    if (type === "checkbox") {
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
    } else {
      setFormValues((prev) => ({
        ...prev,
        [name]: value,
      }));

      setFormErrors((prev) => ({
        ...prev,
        [name]: value ? "" : `${name} is required`,
      }));
    }
  }, []);

  const goBack = () => {
    navigate(-1);
  };

  const resetStates = () => {
    setFormErrors({});

    setFormValues({
      name: "",
      contact: "",
    });

    goBack();
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

  /* const handleSubmit = () => {
    if (validateFormValues()) {
      if (formValues.id) {
        dispatch({
          type: "UPDATE_STUDENT",
          payload: formValues,
        });
      } else {
        const newStudent = {
          ...formValues,
        };

        postStudentData(newStudent);

        // dispatch({
        //   type: "ADD_STUDENT",
        //   payload: newStudent,
        // });
      }

      resetStates();
    }
  }; */
  const handleSubmit = () => {
    if (validateFormValues()) {
      if (formValues.id) {
        dispatch(
          updateStudentData({ studentId: studentId, studentData: formValues }),
        );
      } else {
        dispatch(postStudentData(formValues));
      }

      resetStates();
    }
  };

  const handleCancel = () => {
    goBack();
  };

  return (
    <>
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
            label="Education"
            name={"education"}
            selectedValue={formValues?.education || ""}
            options={[
              { label: "Tech", value: "tech" },
              { label: "Non-Tech", value: "non-tech" },
            ]}
            handleInputChange={handleInputChange}
          />
        </div>

        <div className="mb-2">
          <CheckBox
            name={"timeSlots"}
            label={"Time Slots"}
            selectedValues={formValues?.timeSlots || []}
            options={[
              { label: "Morning", value: "morning" },
              { label: "Afternoon", value: "afternoon" },
              { label: "Evening", value: "evening" },
              { label: "Weekend", value: "weekend" },
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

        <div className="mt-5 d-flex justify-content-center gap-2">
          <button className="btn btn-primary" onClick={handleSubmit}>
            Save
          </button>

          <button className="btn btn-danger" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default Add_Update_Student;
