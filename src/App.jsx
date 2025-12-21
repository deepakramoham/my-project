import { useState, useRef, useEffect, use } from "react";

import ListData from "./contact-list-components/ListData";
import ListInput from "./contact-list-components/ListInput";

function App() {
  const nameRef = useRef(null);
  const contactBoxRef = useRef(null);

  const [students, setStudents] = useState([
    { id: "mbn", name: "Mubeena", contact: 9090990099 },
    { id: "dpk", name: "Deepak", contact: 9090990011 },
    { id: "arn", name: "Arun", contact: 9090990012 },
    { id: "jsh", name: "Jinshi", contact: 9090990013 },
    { id: "arun", name: "Arun", contact: 98765432 },
    { id: "mira", name: "Mira", contact: 99223344 },
    { id: "kavi", name: "Kavin", contact: 98112233 },
    { id: "sita", name: "Sita", contact: 98991122 },
    { id: "ravi", name: "Ravi", contact: 99008877 },
    { id: "tanv", name: "Tanvi", contact: 99334455 },
    { id: "veer", name: "Veer", contact: 98445566 },
    { id: "dani", name: "Daniel", contact: 99778899 },
    { id: "alx", name: "Alex", contact: 98110022 },
    { id: "soph", name: "Sophia", contact: 98224466 },
    { id: "aarv", name: "Aarav", contact: 98123456 },
    { id: "riya", name: "Riya", contact: 98234567 },
    { id: "kian", name: "Kian", contact: 98345678 },
    { id: "zoya", name: "Zoya", contact: 98456789 },
    { id: "yash", name: "Yash", contact: 98567890 },
    { id: "tara", name: "Tara", contact: 98678901 },
    { id: "amir", name: "Amir", contact: 98789012 },
    { id: "noah", name: "Noah", contact: 98890123 },
    { id: "lola", name: "Lola", contact: 98901234 },
    { id: "emma", name: "Emma", contact: 99012345 },
    { id: "liam", name: "Liam", contact: 99123456 },
    { id: "maya", name: "Maya", contact: 99234567 },
    { id: "omar", name: "Omar", contact: 99345678 },
    { id: "hana", name: "Hana", contact: 99456789 },
    { id: "ivan", name: "Ivan", contact: 99567890 },
    { id: "ella", name: "Ella", contact: 99678901 },
    { id: "amir2", name: "Amit", contact: 99789012 },
    { id: "sanj", name: "Sanjay", contact: 99890123 },
    { id: "kate", name: "Kate", contact: 99901234 },
    { id: "joel", name: "Joel", contact: 98112244 },
  ]);

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  useEffect(() => {
    // console.log(contactBoxRef.current.scrollTop);
    // console.log(contactBoxRef.current.scrollHeight);
    contactBoxRef.current.scrollTop = contactBoxRef.current.scrollHeight;
  }, [students]);

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
            <ListInput addStudent={addStudent} nameRef={nameRef} />
          </div>
          <div className="contacts" ref={contactBoxRef}>
            <ListData students={students} deleteStudent={deleteStudent} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
