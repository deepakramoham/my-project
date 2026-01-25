import { useState, useRef, useEffect } from "react";
import { IoAdd } from "react-icons/io5";
import { AppContext } from "../context/AppContextProvider";
import { useContext } from "react";
import Input from "../components/Input";

const ListInput = () => {
  console.log("listInput rendered");
  const nameRef = useRef(null);
  const contactRef = useRef(null);
  const { students, setStudents, search, setSearch } = useContext(AppContext);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [contactError, setContactError] = useState("");

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  const handleInputChange = (event) => {
    setName(event.target.value);
  };

  const addStudent = (newStudent) => {
    setStudents(
      [newStudent, ...students]?.sort((a, b) =>
        a?.name?.localeCompare(b?.name),
      ),
    );
  };

  const handleSubmit = () => {
    const contact = contactRef.current.value;

    if (!contact) {
      setContactError("Contact is required");
    }
    if (!name) {
      setNameError("Name is required");
    }

    if (contact && name) {
      const newStudent = {
        id: crypto.randomUUID(),
        name,
        contact,
      };
      addStudent(newStudent);
      setName("");
      contactRef.current.value = "";
      nameRef.current.focus();
    }
  };

  return (
    <>
      <div className="list-input-section">
        <div className="list-input-container">
          <div className="list-input">
            <Input
              ref={nameRef}
              className={"my-input"}
              value={name}
              placeholder={"Enter your name"}
              onChange={handleInputChange}
              error={nameError}
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
              ref={contactRef}
              placeholder="Contact Number . . ."
              error={contactError}
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
            placeholder="Search . . . "
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
    </>
  );
};

export default ListInput;
