import ListItem from "./ListItem";

function ListData({ students, deleteStudent }) {
  return students?.map((student) => (
    <ListItem
      key={student?.id}
      student={student}
      deleteStudent={deleteStudent}
    />
  ));
}

export default ListData;
