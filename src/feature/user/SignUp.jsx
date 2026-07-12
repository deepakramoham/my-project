import Input from "../../components/Input";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import { register } from "./userThunks";

const SignUp = () => {
  const dispatch = useDispatch();
 

  const { loading } = useSelector((state) => state.userState);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});

  // const resetStates = () => {
  //   setFormErrors({});
  //   setFormValues({
  //     name: "",
  //     email: "",
  //     password: "",
  //   });
  // };
  useEffect(() => {}, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((preValues) => ({ ...preValues, [name]: value }));
  };

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
      dispatch(register(formValues));
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

        <div
          style={{
            marginBottom: "1em",
          }}
        >
          <Input
            name={"name"}
            value={formValues?.name || ""}
            type="text"
            onChange={handleInputChange}
            placeholder="Your Name . . ."
            error={formErrors?.name}
            label={"Name"}
          />
        </div>
        <div
          style={{
            marginBottom: "1em",
          }}
        >
          <Input
            name={"email"}
            value={formValues?.email || ""}
            type="email"
            onChange={handleInputChange}
            placeholder="Enter your Email"
            error={formErrors?.email}
            label={"Email"}
          />
        </div>

        <div
          style={{
            marginBottom: "1em",
          }}
        >
          <Input
            name={"password"}
            value={formValues?.password || ""}
            type="password"
            onChange={handleInputChange}
            placeholder="Enter your password"
            error={formErrors?.password}
            label={"Password"}
          />
        </div>

        <div className="d-flex justify-content-end">
          <p>
            <Link to="/sign-in">Already User ?</Link>
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
            Sign Up
          </button>
          {loading && <Loading />}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
