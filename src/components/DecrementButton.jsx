import { Decrement } from "../redux/slice/counterSlice";
import { useDispatch, useSelector } from "react-redux";
const DecrementButton = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  return <button onClick={() => dispatch(Decrement())}>-</button>;
};

export default DecrementButton;
