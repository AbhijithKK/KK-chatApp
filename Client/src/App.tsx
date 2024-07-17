import "./App.css";
import LandingPage from "./Components/LandingPage/LandingPage";
import Login from "./Components/LoginPage/Login";
import Signup from "./Components/SignupPage/Signup";
import { Route, Routes } from "react-router-dom";
import { Counter } from "./Components/Utils/Redux/Redux";

function App() {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<LandingPage />} />
      </Routes>
      {/* <Counter/> */}
    </>
  );
}

export default App;
