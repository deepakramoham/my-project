import useCounterStore from "../Zustand/CounterStore";

const DisplayCount = () => {
  const { count } = useCounterStore();

  return <div>{count}</div>;
};

export default DisplayCount;
