import { memo, useEffect, useMemo, useState } from "react";
import "./App.css";
import LandingPage from "./Components/LandingPage/LandingPage";
import Login from "./Components/LoginPage/Login";
import Signup from "./Components/SignupPage/Signup";
import { Navigate, Route, Routes } from "react-router-dom";
import { checkAuthApi } from "./Components/Utils/api";
import { useSelector } from "react-redux";
import { RootState } from "./Components/Utils/Redux/Store";

function App() {
  const { auth } = useSelector((state: RootState) => state.authData);
  const [autht, setAuth] = useState<boolean>(false);
  const Memo = useMemo(() => {
    return auth;
  }, [auth]);
  useEffect(() => {
    const apiHelper = async () => {
    
        
        const res = await checkAuthApi();
        setAuth(res);
      
    };
    apiHelper();
  }, [Memo]);

  return (
    <>
      <Routes>
        
          <>
            <Route path="/signup" element={autht?<Navigate to={'/home'}/>:<Signup />} />
            <Route path="/" element={autht ? <Navigate to={'/home'}/> :<Login />} />
            <Route path="/*" element={autht ? <Navigate to={'/home'}/> :<Login />} />
          </>
        
        <Route path="/home" element={!autht ? <Navigate to={'/'}/> :<LandingPage />} />
      </Routes>
    </>
  );
}

export default App;
