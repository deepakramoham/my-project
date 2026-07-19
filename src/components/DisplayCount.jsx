import { useSelector } from "react-redux";
const DisplayCount = () => {
  const count = useSelector((state) => state.count);

  return <div>{count}</div>;
};

export default DisplayCount;
