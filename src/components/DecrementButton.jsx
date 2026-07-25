// import { Decrement } from "../redux/slice/counterSlice";
// import { useDispatch, useSelector } from "react-redux";

import useCounterStore from "../Zustand/CounterStore";
const DecrementButton = () => {
  const { decrement } = useCounterStore();

  return <button onClick={() => decrement()}>-</button>;
};

export default DecrementButton;
