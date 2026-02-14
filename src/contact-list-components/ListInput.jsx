import { useState, useRef, useEffect, useCallback } from "react";
import { IoAdd } from "react-icons/io5";
import { AppContext } from "../context/AppContextProvider";
import { useContext } from "react";
import Input from "../components/Input";
import Modal from "../components/Modal";
import RadioButton from "../components/RadioButton";
import CheckBox from "../components/CheckBox";

const ListInput = () => {
  console.log("listInput rendered");
  const nameRef = useRef(null);
  const { students, setStudents, search, setSearch } = useContext(AppContext);
  const [formValues, setFormValues] = useState({
    name: "",
    contact: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (modalOpen) {
      nameRef?.current?.focus();
    }
  }, [modalOpen]);

  const handleInputChange = useCallback((event) => {
    const { name, value, type, checked } = event.target;

    console.log(name, value, type, checked);
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
    } else {
      setFormValues((prev) => ({ ...prev, [name]: value }));
      setFormErrors((prev) => ({
        ...prev,
        [name]: value ? "" : `${name} is required`,
      }));
    }
  }, []);

  const addStudent = (newStudent) => {
    setStudents(
      [newStudent, ...students]?.sort((a, b) =>
        a?.name?.localeCompare(b?.name),
      ),
    );
  };

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
      const newStudent = {
        id: crypto.randomUUID(),
        ...formValues,
      };
      addStudent(newStudent);
      resetStates();
    }
  };

  const handleSearch = useCallback((e) => setSearch(e.target.value), []);

  const handleClose = () => setModalOpen(!modalOpen);

  return (
    <>
      {modalOpen && (
        <Modal
          modalTitle={"Add Contact"}
          modalBody={
            <div className="p-2">
              <Input
                ref={nameRef}
                name={"name"}
                className={"my-input mb-4"}
                value={formValues?.name || ""}
                placeholder={"Enter your name"}
                onChange={handleInputChange}
                error={formErrors?.name}
              />

              <Input
                name={"contact"}
                value={formValues?.contact || ""}
                onChange={handleInputChange}
                placeholder="Contact Number . . ."
                error={formErrors?.contact}
              />

              <div>
                <RadioButton
                  label="Gender"
                  name={"gender"}
                  options={[
                    { label: "Male", value: "male" },
                    { label: "Female", value: "female" },
                    { label: "Other", value: "other" },
                  ]}
                  handleInputChange={handleInputChange}
                />
              </div>

              <div>
                <CheckBox
                  name={"skills"}
                  label={"Skills"}
                  options={[
                    { label: "HTML", value: "html" },
                    { label: "CSS", value: "css" },
                    { label: "Javascript", value: "javascript" },
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

      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "5px",
        }}
      >
        <div style={{ width: "100%" }}>
          <Input
            name={"search"}
            placeholder="Search . . . "
            type="text"
            value={search}
            onChange={handleSearch}
          />
        </div>
        <div className="p-2">
          <button
            className="btn btn-success"
            onClick={() => setModalOpen(!modalOpen)}
          >
            <IoAdd style={{ fontSize: "2em" }} />
          </button>
        </div>
      </div>
    </>
  );
};

export default ListInput;
