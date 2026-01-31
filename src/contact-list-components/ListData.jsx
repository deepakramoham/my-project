import ListItem from "./ListItem";
import { useContext } from "react";
import { AppContext } from "../context/AppContextProvider";
function ListData() {
  console.log("listData rendered");
  const { students, search } = useContext(AppContext);

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
