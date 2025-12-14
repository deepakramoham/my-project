import { useState } from "react";


function ListItem({ name }) {
  console.log("list item is running");
  // console.log(props);
  // const name = props?.name;
  // const { name } = props;
  return (
    <div className="list-item">
      <span>{name}</span>
      <button>Delete</button>
    </div>
  );
}

function ListData({ students }) {
  // const students = ["Mubeena", "Deepak", "Jinshi", "Uma"];
  console.log("list data is running");

  console.log(students, "list data");
  return students?.map((student) => (
    <ListItem key={student?.id} name={student.name} />
  ));
}

function ListInput({ students, setStudents }) {
  // const state = React.useState("mubeena");
  const [name, setName] =useState("mubeena");
  // console.log(state);
  // const name = state[0];
  // const setName = state[1];
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

function App() {
  console.log("app is running");

  const [students, setStudents] = useState([
    { id: "mbn", name: "Mubeena" },
    { id: "dpk", name: "Deepak" },
    { id: "arn", name: "Arun" },
    { id: "jsh", name: "Jinshi" },
  ]);
  return (
    <>
      <ListInput students={students} setStudents={setStudents} />
      <ListData students={students} />
    </>
  );
}

export default App;