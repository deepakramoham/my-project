import { useState, useRef, useEffect } from "react";

import ListData from "./contact-list-components/ListData";
import ListInput from "./contact-list-components/ListInput";

function App() {
  const nameRef = useRef(null);

  const [students, setStudents] = useState([
    { id: "mbn", name: "Mubeena", contact: 9090990099 },
    { id: "dpk", name: "Deepak", contact: 9090990011 },
    { id: "arn", name: "Arun", contact: 9090990012 },
    { id: "jsh", name: "Jinshi", contact: 9090990013 },
  ]);

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  const addStudent = (newStudent) => {
    setStudents([...students, newStudent]);
  };

  const deleteStudent = (studentId) => {
    setStudents((prev) => prev.filter((std) => std.id !== studentId));
  };

  console.log(students);

  return (
    <>
      <div className="container">
        <div className="outer-container">
          <div className="contact-collector">
            <ListInput addStudent={addStudent} ref={nameRef} />
          </div>
          <div className="contacts">
            <ListData students={students} deleteStudent={deleteStudent} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
