import "./Signup.css";
import logo from '../../assets/Generate A Logo Named KK .its For A Social Media .png'
import { useFormik } from "formik";
import { userSchema } from "../Utils/Validation";
import { signupApi } from "../Utils/api";
import { user } from "../Utils/Interface";
import toast, { Toaster } from 'react-hot-toast';
import { useState } from "react";
import {  Link, useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import Modal from "../Modal/Modal";

function Signup() {
  const [isOpen,setIsopen]=useState<boolean>(false)
  const [otp,setotp]=useState<string>('')
  const [getOtp,setgetotp]=useState<string>('')
  const [userData,setUserData]=useState<user>({
    name: "",
      email: "",
      number: "",
      password: "",
      cpassword: "",
  })
  const Navigate=useNavigate()
    const [throttil,setThrottil]=useState<boolean>(true)
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      number: "",
      password: "",
      cpassword: "",
    },

    onSubmit: async(values:user) => {
      setUserData(values)
        setIsopen(true)
    },
    validationSchema:userSchema
  });
  const handleCreateAccount=async()=>{
if (getOtp===otp) {
  

    if (throttil) {
        
      setThrottil(false)
      const result=await signupApi(userData)
      if(result){
          Navigate('/')
      }else{
          toast('Already you have an account')
      }
      
      setTimeout(async() => {
          setThrottil(true)
      
  }, 6000);
}
}else{
  // otp ender faild
}
  }
  return (
    <>
    <Toaster
  position="top-center"
  reverseOrder={false}
/>
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
          <div className="login-link">
            <p>Already have an account? &nbsp;
               <Link className="login-link-color" to={'/'}>Log in here</Link></p>
          </div>
        </div>
      </div>
      {isOpen &&
        createPortal(<Modal headding={'Verify OTP '}
        content={ <div className="Otp-container">
          <input onChange={(e)=>setotp(e.target.value)} value={otp} className="Otp-input" type="text" max={6}  maxLength={6}/>
          <p>Resend OTP</p>
          <button type="button" onClick={handleCreateAccount} className="Otp-btn">Verify</button>
        </div>} 
        closeFnc={setIsopen} />, document.body)}
    </>
  );
}

export default Signup;
