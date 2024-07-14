import './Login.css'
import '../SignupPage/Signup.css'
import {useFormik}  from 'formik'
import logo from '../../assets/Generate A Logo Named KK .its For A Social Media .png'
import { loginScheema } from '../Utils/Validation'
import toast, { Toaster } from 'react-hot-toast';


function Login() {
  const formik=useFormik({
    initialValues:{
      email:"",
      password:""
    },
    onSubmit:(values)=>{

    },
    validationSchema:loginScheema
  })
  return (
    <>
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
              </div>
              <div className="inputrow">
                <button type="submit">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
