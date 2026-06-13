import Layout from "./Layout";
import { useSelector } from "react-redux";
import useTokenValidation from "./hooks/useTokenValidation";
import { Navigate } from "react-router-dom";

function App() {
  const { user } = useSelector((state) => state.userState);
  const accessToken = user?.accessToken || "";

  useTokenValidation(accessToken || "");

  return user && accessToken ? <Layout /> : <Navigate to="/sign-in" />;
}

export default App;
