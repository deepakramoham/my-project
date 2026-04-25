import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

function App() {
  const count = useSelector((state) => state.count);

  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch({ type: "Increment" });
  };

  const handleDecrement = () => {
    dispatch({ type: "Decrement" });
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
