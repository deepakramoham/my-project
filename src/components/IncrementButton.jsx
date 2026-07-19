import { getAllCourses, Increment } from "../redux/slice/counterSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const IncrementButton = () => {
  const dispatch = useDispatch();

  return (
    <>
      <button onClick={() => dispatch(Increment())}>+</button>
      <button onClick={() => dispatch(getAllCourses())}>fetchTasks</button>
    </>
  );
};

export default IncrementButton;
