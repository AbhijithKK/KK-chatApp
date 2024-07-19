import { useEffect, useState } from "react";
import "./App.css";
import LandingPage from "./Components/LandingPage/LandingPage";
import Login from "./Components/LoginPage/Login";
import Signup from "./Components/SignupPage/Signup";
import { Route, Routes } from "react-router-dom";
import { checkAuthApi } from "./Components/Utils/api";

function App() {
  const [autht, setAuth] = useState<boolean>(false);
  useEffect(()=>{
    const apiHelper=async()=>{
      const res=await checkAuthApi()
      setAuth(res)
    }
    apiHelper()
  },[])
  return (
    <>
      <Routes>
        {!autht && (
          <>
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Login />} />
          </>
        )}
        {autht && <Route path="/home" element={<LandingPage />} />}
      </Routes>
    </>
  );
}

export default App;
