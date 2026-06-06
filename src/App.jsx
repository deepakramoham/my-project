import Layout from "./Layout";
import { useSelector } from "react-redux";
import useTokenValidation from "./hooks/useTokenValidation";

function App() {
  const { user } = useSelector((state) => state.userState);
  const accessToken = user?.accessToken || "";

  useTokenValidation(accessToken || "");

  return <Layout />;
}

export default App;
