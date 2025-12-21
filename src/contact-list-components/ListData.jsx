import ListItem from "./ListItem";

function ListData({ students, deleteStudent }) {
  return students?.length > 0 ? (
    students?.map((student) => (
      <ListItem
        key={student?.id}
        student={student}
        deleteStudent={deleteStudent}
      />
    ))
  ) : (
    <div class="no-contact-message">
      <p>No Contact Found</p>
    </div>
  );
}

export default ListData;
