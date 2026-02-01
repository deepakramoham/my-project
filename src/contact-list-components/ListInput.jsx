import { useState, useRef, useEffect, useCallback } from "react";
import { IoAdd } from "react-icons/io5";
import { AppContext } from "../context/AppContextProvider";
import { useContext } from "react";
import Input from "../components/Input";

const ListInput = () => {
  console.log("listInput rendered");
  const nameRef = useRef(null);
  const { students, setStudents, search, setSearch } = useContext(AppContext);
  const [formValues, setFormValues] = useState({
    name: "",
    contact: "",
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));

    setFormErrors((prev) => ({
      ...prev,
      [name]: value ? "" : `${name} is required`,
    }));
  }, []);

  const addStudent = (newStudent) => {
    setStudents(
      [newStudent, ...students]?.sort((a, b) =>
        a?.name?.localeCompare(b?.name),
      ),
    );
  };

  const resetStates = () => {
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
      console.log("submitted");
      const newStudent = {
        id: crypto.randomUUID(),
        ...formValues,
      };
      addStudent(newStudent);
      nameRef.current.focus();
      resetStates();
    }
  };

  const handleSearch = useCallback((e) => setSearch(e.target.value), []);

  return (
    <>
      <div className="contact-collector">
        <div className="list-input-section">
          <div className="list-input-container">
            <div className="list-input">
              <Input
                name={"name"}
                ref={nameRef}
                className={"my-input"}
                value={formValues?.name || ""}
                placeholder={"Enter your name"}
                onChange={handleInputChange}
                error={formErrors?.name}
              />
              {/* <input
              ref={nameRef}
              className="my-input"
              value={name}
              placeholder="Enter your name"
              onChange={handleInputChange}
            />
            <small>{nameError}</small> */}
              <Input
                name={"contact"}
                value={formValues?.contact || ""}
                onChange={handleInputChange}
                placeholder="Contact Number . . ."
                error={formErrors?.contact}
              />
            </div>

            <div className="list-add-button">
              <button onClick={handleSubmit}>
                <IoAdd />
              </button>
            </div>
          </div>

          <div className="list-search">
            <Input
              name={"search"}
              placeholder="Search . . . "
              type="text"
              value={search}
              onChange={handleSearch}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ListInput;
