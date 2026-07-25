import useCounterStore from "../Zustand/CounterStore";

const IncrementButton = () => {
  const increment = useCounterStore((state) => state.increment);
  //const getAllCourses = useCounterStore((state) => state.getAllCourses);

  return (
    <>
      <button onClick={increment}>+</button>
      
    </>
  );
};

export default IncrementButton;
