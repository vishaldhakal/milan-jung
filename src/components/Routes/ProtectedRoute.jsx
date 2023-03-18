import { Navigate, Outlet } from "react-router";
import useAuth from "../../hooks/UseAuth";

const ProtectedRoute = () => {
  const { bol } = useAuth();
  
  
 
  if (
    localStorage.getItem("access_jung") &&
    bol &&
    localStorage.getItem("refresh_jung")
  ) {
    // return bol ? <Outlet /> : <Navigate to="/" />;
    return <Outlet />;
  } else {
return window.location.href='/login'    
    // return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
