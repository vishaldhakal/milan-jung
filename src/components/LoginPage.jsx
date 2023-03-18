import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    localStorage.setItem("access_jung", "biraj");
    localStorage.setItem("refresh_jung", "hahah");
    navigate("/admin-dashboard");
  };
  const token = localStorage.getItem("access_jung");
  return (
    <>
      {token ? (
        <Navigate to="/admin-dashboard" />
      ) : (
        <>
          <div className="text-xl bg-black">loginPage</div>
          <button className="bg-red-500 px-4 py-2" onClick={handleLogin}>
            Login
          </button>
        </>
      )}
    </>
  );
};

export default LoginPage;
