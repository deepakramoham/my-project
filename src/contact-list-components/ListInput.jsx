import { useState, useRef, useEffect, useCallback } from "react";
import { IoAdd } from "react-icons/io5";
import Input from "../components/Input";
import Modal from "../components/Modal";
import { useSelector, useDispatch } from "react-redux";

const ListInput = () => {
  console.log("listInput rendered");
  const nameRef = useRef(null);
  const search = useSelector((state) => state.search);
  const dispatch = useDispatch();
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
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));

    setFormErrors((prev) => ({
      ...prev,
      [name]: value ? "" : `${name} is required`,
    }));
  }, []);

  const addStudent = (newStudent) => {
    dispatch({ type: "add", payload: newStudent });
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

  const handleSearch = useCallback(
    (e) => dispatch({ type: "search", payload: e.target.value }),
    [],
  );

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
