import ListItem from "./ListItem";
import { useSelector } from "react-redux";

function ListData() {
  console.log("listData rendered");
  const students = useSelector((state) => state.students);
  const search = useSelector((state) => state.search);

  return (
    <>
      <div className="contacts">
        {students?.length > 0 ? (
          students
            ?.filter((student) =>
              student?.name?.toLowerCase()?.includes(search?.toLowerCase()),
            )
            ?.map((student) => <ListItem key={student?.id} student={student} />)
        ) : (
          <div class="no-contact-message">
            <p>No Contact Found</p>
          </div>
        )}
      </div>
    </>
  );
}

export default ListData;
