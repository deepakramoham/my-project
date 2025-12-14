import { useState } from "react";

function ListInput({ students, setStudents }) {
  const [name, setName] = useState("");

  console.log("list input running");
  console.log(name);

  const handleInputChange = (event) => {
    setName(event.target.value);
  };
  const handleAdd = () => {
    console.log(name);

    const newStudent = {
      id: crypto.randomUUID(),
      name,
    };
    setStudents([...students, newStudent]);
  };
  return (
    <>
      <input
        value={name}
        placeholder="Enter your name"
        onChange={handleInputChange}
      />
      <button onClick={handleAdd}>Add</button>
    </>
  );
}

export default ListInput;
