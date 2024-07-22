import "./Login.css";
import "../SignupPage/Signup.css";
import { useFormik } from "formik";
import logo from "../../assets/Generate A Logo Named KK .its For A Social Media .png";
import { loginScheema } from "../Utils/Validation";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { loginApi } from "../Utils/api";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userUpdate } from "../Utils/Redux/Reducers";
import { RootState } from "../Utils/Redux/Store";
import { updateAuth } from "../Utils/Redux/AuthReducer";

function Login() {
  const { auth } = useSelector((state: RootState) => state.authData);
  const Dispatch = useDispatch();
  const Navigate = useNavigate();
  const [throttil, setThrottil] = useState<boolean>(true);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      if (throttil) {
        setThrottil(false);
        const result = await loginApi(values);
        if (!result.error) {
          Dispatch(userUpdate(result.data));
          Dispatch(updateAuth(!auth));

          Navigate("/home");
        } else {
          toast("Plese enter currect email address and password");
        }
      }
      setTimeout(() => {
        setThrottil(true);
      }, 6000);
    },
    validationSchema: loginScheema,
  });
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="login-container">
        <div className="login-outer-box">
          <div className="signup-headder">
            <div className="signuplogo">
              <img src={logo} alt="logo" />
            </div>
            <p>KK-chatapp</p>
          </div>
          <div className="login-form">
            <form onSubmit={formik.handleSubmit}>
              <div className="inputrow">
                <label htmlFor="">
                  Email <span className="label-indicator">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                <small>{formik.errors.email}</small>
              </div>

              <div className="inputrow">
                <label htmlFor="">
                  Password <span className="label-indicator">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                <small>{formik.errors.password}</small>
                <div> &nbsp;</div>
              </div>
              <div className="inputrow">
                <button type="submit">Login</button>
              </div>
              <div className="signup-link">
                <p>
                  Don't have an account? &nbsp;
                  <Link className="signup-link-color" to={"/signup"}>
                    Sign up{" "}
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
