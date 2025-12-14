import ListItem from "./ListItem";

function ListData({ students }) {
  console.log("list data is running");

  console.log(students, "list data");
  return students?.map((student) => (
    <ListItem key={student?.id} name={student.name} />
  ));
}

export default ListData;
