import Input from "../../components/Input";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../components/Loading";
import { login } from "./userThunks";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [formErrors, setFormErrors] = useState({});

  const { user, error, loading } = useSelector((state) => state.userState);
  console.log(user);

  useEffect(() => {
    if (user && !error) {
      if (user?.role === 1100) {
        navigate("/dashboard");
      }
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((preValues) => ({ ...preValues, [name]: value }));
  };

  const resetStates = () => {
    setFormErrors({});
    setFormValues({
      email: "",
      password: "",
    });
  };

  useEffect(() => {}, []);

  const validateFormValues = () => {
    const errors = {};
    Object.keys(formValues).forEach((key) => {
      if (!formValues[key]) {
        errors[key] = `${key}  is required`;
      }
    });
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (validateFormValues()) {
      dispatch(login(formValues));
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          flexFlow: "column nowrap",
          justifyContent: "center",
          padding: "2em",
          boxShadow: "0px 0px 2px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            fontSize: "1.5rem",
            fontWeight: "500",
            padding: ".5em",
            marginBottom: ".5em",
          }}
        >
          Course Master
        </div>

        <Input
          name={"email"}
          value={formValues?.email || ""}
          type="email"
          onChange={handleInputChange}
          placeholder="Enter your Email"
          error={formErrors?.email}
          label={"Email"}
        />

        <Input
          name={"password"}
          value={formValues?.password || ""}
          type="password"
          onChange={handleInputChange}
          placeholder="Enter your password"
          error={formErrors?.password}
          label={"Password"}
        />

        <div className="d-flex justify-content-end">
          <p>
            <Link to="/sign-up">New User ?</Link>
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: ".5em",
          }}
        >
          <button className="btn btn-primary" onClick={handleSubmit}>
            Sign In
          </button>

          {false && <Loading />}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
