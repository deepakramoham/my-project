import { useEffect, useState } from "react";
import { getAllCourses } from "./redux/slice/counterSlice";
import DecrementButton from "./components/DecrementButton";
import IncrementButton from "./components/IncrementButton";
import DisplayCount from "./components/DisplayCount";
import { useDispatch } from "react-redux";
function App() {
  // const count = useSelector((state) => state.count);

  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getAllCourses());
  // }, []);

  // const handleIncrement = () => {
  //   dispatch(Increment());
  // };
  // const handleDecrement = () => {
  //   dispatch(Decrement());
  // };

  return (
    <>
      <div>
        <IncrementButton />
        <DisplayCount />
        <DecrementButton />
      </div>
    </>
  );
}

export default App;
