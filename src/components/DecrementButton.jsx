
import useCounterStore from "../Zustand/CounterStore";

const DecrementButton = () => {
  const decrement = useCounterStore((state) => state.decrement);

  return <button onClick={decrement}>-</button>;
};

export default DecrementButton;
