import "./Signup.css";
import logo from '../../assets/Generate A Logo Named KK .its For A Social Media .png'
import { useFormik } from "formik";
import { userSchema } from "../Utils/Validation";
import { signupApi } from "../Utils/api";
import { user } from "../Utils/Interface";

function Signup() {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      number: "",
      password: "",
      cpassword: "",
    },

    onSubmit: async(values:user) => {
        const result=await signupApi(values)
        console.log(result);
        
    },
    validationSchema:userSchema
  });
  return (
    <>
      <div className="signup-container">
        <div className="form-outbox">
          <div className="signup-headder">
            <div className="signuplogo">

            <img src={logo} alt="logo" />
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
                <small>{formik.errors.name}</small>
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
                <small>{formik.errors.email}</small>
              </div>
              <div className="inputrow">
                <label htmlFor="">
                  Mob Number <span className="label-indicator">*</span>
                </label>
                <input
                  type="number"
                  name="number"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.number}
                 
                />
                <small>{formik.errors.number}</small>
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
                <small>{formik.errors.cpassword}</small>
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
