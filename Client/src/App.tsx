import { useState } from "react";
import "./App.css";
import LandingPage from "./Components/LandingPage/LandingPage";
import Login from "./Components/LoginPage/Login";
import Signup from "./Components/SignupPage/Signup";
import { Route, Routes } from "react-router-dom";

function App() {
  const [autht, setAuth] = useState<boolean>(false);
  
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
      {/* <Counter/> */}
    </>
  );
}

export default App;
