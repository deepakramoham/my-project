function ListItem({ student, deleteStudent }) {
  return (
    <div className="list-item">
      <div>
        <p className="name-para">{student?.name}</p>

        <p className="phone-number">{student?.contact}</p>
      </div>
      <div className="delete-button-div">
        <button
          className="delete-button"
          onClick={() => deleteStudent(student?.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ListItem;
