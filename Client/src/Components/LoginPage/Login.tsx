import './Login.css'
import '../SignupPage/Signup.css'
import {useFormik}  from 'formik'
import logo from '../../assets/Generate A Logo Named KK .its For A Social Media .png'
import { loginScheema } from '../Utils/Validation'
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react'
import { loginApi } from '../Utils/api'
import { useNavigate } from 'react-router-dom'


function Login() {
  const Navigate=useNavigate()
  const [throttil,setThrottil]=useState<boolean>(true)
  const formik=useFormik({
    initialValues:{
      email:"",
      password:""
    },
    onSubmit:async(values)=>{
      if (throttil) {
        setThrottil(false)
        const result=await loginApi(values)
        if (!result.error) {
          Navigate('/home')
        }else{
          toast('Plese enter currect email address and password')
        }
      }
      setTimeout(() => {
        setThrottil(true)
      }, 6000);
    },
    validationSchema:loginScheema
  })
  return (
    <>
    <Toaster
  position="top-center"
  reverseOrder={false}
/>
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
