import { getAllCourses, Increment } from "../redux/slice/counterSlice";
import useCounterStore from "../Zustand/CounterStore";
// import { useSelector } from "react-redux";

const IncrementButton = () => {
  const { increment, decrement,courses, getAllCourses } = useCounterStore();

  // const courses = useSelector((state) => state?.courses);
  console.log(courses);
  return (
    <>
      <button onClick={() => increment()}>+</button>
      <button onClick={() => getAllCourses()}>fetchTasks</button>
    </>
  );
};

export default IncrementButton;
