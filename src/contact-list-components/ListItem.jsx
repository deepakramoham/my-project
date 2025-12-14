function ListItem({ name }) {
  console.log("list item is running");
  return (
    <div className="list-item">
      <span>{name}</span>
      <button>Delete</button>
    </div>
  );
}

export default ListItem;
