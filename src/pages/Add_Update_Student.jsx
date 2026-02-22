import Input from "../components/Input";
import RadioButton from "../components/RadioButton";
import CheckBox from "../components/CheckBox";
import Dropdown from "../components/Dropdown";
import { useState, useRef, useEffect, useContext, useCallback } from "react";
import { AppContext } from "../context/AppContextProvider";
import { useNavigate, useParams } from "react-router-dom";
const Add_Update_Student = () => {
  const nameRef = useRef(null);
  const navigate = useNavigate();

  const params = useParams();
 
  useEffect(() => {
    nameRef?.current?.focus();
  }, []);

  const { courses, dispatch } = useContext(AppContext);

  const [formValues, setFormValues] = useState({
    name: "",
    contact: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [courseOptions, setCourseOptions] = useState([]);

  useEffect(() => {
    const options = courses?.map((course) => ({
      label: course?.courseTitle,
      value: course?.id,
    }));
    setCourseOptions(options);
  }, []);

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
  const handleCancel = () => {
    goBack();
  };
  return (
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

      <div className="mt-5 d-flex justify-content-center gap-2">
        <button className="btn btn-primary" onClick={handleSubmit}>
          Save
        </button>
        <button className="btn btn-danger" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Add_Update_Student;
