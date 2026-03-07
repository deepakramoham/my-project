import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from "react-redux";

function ListItem({ student }) {
  console.log("listItem rendered");
  const dispatch = useDispatch();


  const deleteStudent = (studentId) => {
    dispatch({ type: "delete", payload: studentId });
  };

  return (
    <div className="list-item">
      <div>
        <p className="name-para">{student?.name}</p>

        <p className="phone-number">{student?.contact}</p>
      </div>
      <div className="delete-button-div">
        <button
          className="btn btn-danger"
          onClick={() => deleteStudent(student?.id)}
        >
          <RiDeleteBin6Line style={{ fontSize: "2em" }} />
        </button>
      </div>
    </div>
  );
}

export default ListItem;
