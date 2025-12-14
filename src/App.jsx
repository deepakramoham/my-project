import { useState } from "react";

import ListData from "./contact-list-components/ListData";
import ListInput from "./contact-list-components/ListInput";

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
