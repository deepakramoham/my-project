import store from "./redux/store";
import { useState } from "react";

function App() {
  const [count, setCount] = useState(store.getState().count);
  store.subscribe(() => {
    setCount(store.getState().count);
  });

  const handleIncrement = () => {
    store.dispatch({ type: "Increment" });
  };

  const handleDecrement = () => {
    store.dispatch({ type: "Decrement" });
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
