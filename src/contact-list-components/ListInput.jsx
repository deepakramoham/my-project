import { useState, useRef } from "react";

const ListInput = ({ addStudent, nameRef }) => {
  const contactRef = useRef(null);

  const [name, setName] = useState("");

  const handleInputChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = () => {
    const contact = contactRef.current.value;
    const newStudent = {
      id: crypto.randomUUID(),
      name,
      contact,
    };

    if (contact && newStudent) {
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
            <input
              ref={nameRef}
              className="my-input"
              value={name}
              placeholder="Enter your name"
              onChange={handleInputChange}
            />

            <input
              ref={contactRef}
              defaultValue={""}
              placeholder="Contact Number . . ."
            />
          </div>

          <div className="list-add-button">
            <button onClick={handleSubmit}>Add</button>
          </div>
        </div>

        <div className="list-search">
          <input placeholder="Search . . . " type="text" />
        </div>
      </div>
    </>
  );
};

export default ListInput;
