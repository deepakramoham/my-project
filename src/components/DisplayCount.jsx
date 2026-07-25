import useCounterStore from "../Zustand/CounterStore";

const DisplayCount = () => {
  const count = useCounterStore((state) => state.count);

  return <div>{count}</div>;
};

export default DisplayCount;
