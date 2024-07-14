import "./Signup.css";
import { useFormik } from "formik";

function Signup() {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      number: "",
      password: "",
      cpassword: "",
    },

    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <>
      <div className="signup-container">
        <div className="form-outbox">
          <div className="signup-headder">
            <div className="signuplogo">

            <img src="" alt="logo" />
            </div>
            <p>KK-chatapp</p>
          </div>
          <div className="signup-form">
            <form onSubmit={formik.handleSubmit}>
              <div className="inputrow">
                <label htmlFor="">
                  Full Name <span className="label-indicator">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                />
                <small>errmsg</small>
              </div>
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
                <small>errmsg</small>
              </div>
              <div className="inputrow">
                <label htmlFor="">
                  Mob Number<span className="label-indicator">*</span>
                </label>
                <input
                  type="number"
                  name="number"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.number}
                  max={10}
                  min={10}
                />
                <small>errmsg</small>
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
                <small>errmsg</small>
              </div>
              <div className="inputrow">
                <label htmlFor="">
                  Confirm Password <span className="label-indicator">*</span>
                </label>
                <input
                  type="password"
                  name="cpassword"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.cpassword}
                />
                <small>errmsg</small>
              </div>
              <div className="inputrow">
                <button type="submit">Sign Up</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
