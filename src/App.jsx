import { useState } from "react";

import ListData from "./contact-list-components/ListData";
import ListInput from "./contact-list-components/ListInput";

function App() {
  const [students, setStudents] = useState([
    { id: "mbn", name: "Mubeena" },
    { id: "dpk", name: "Deepak" },
    { id: "arn", name: "Arun" },
    { id: "jsh", name: "Jinshi" },
  ]);

  const addStudent = (newStudent) => {
    setStudents([...students, newStudent]);
  };

  const deleteStudent = (studentId) => {
    setStudents((prev) => prev.filter((std) => std.id !== studentId));
  };

  console.log(students)
  return (
    <>
      <ListInput addStudent={addStudent} />
      <ListData students={students} deleteStudent={deleteStudent} />
    </>
  );
}

export default App;
