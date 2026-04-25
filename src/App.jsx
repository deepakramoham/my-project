import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Increment, Decrement } from "./redux/slice/counterSlice";
import { getAllCourses } from "./redux/slice/counterSlice";
function App() {
  const count = useSelector((state) => state.count);

  useEffect(() => {
    dispatch(getAllCourses());
  }, []);

  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch(Increment(10));
  };
  const handleDecrement = () => {
    dispatch(Decrement());
  };

  return (
    <>
      <div>
        <button onClick={handleIncrement}>+</button>
        <div>{count}</div>
        <button onClick={handleDecrement}>-</button>
      </div>
    </>
  );
}

export default App;
