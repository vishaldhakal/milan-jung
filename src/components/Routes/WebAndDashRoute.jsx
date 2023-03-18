import { Routes, Route } from "react-router-dom";
import HomeRoute from "./HomeRoute";
import ProtectedRoute from "./ProtectedRoute";
import AdminDashboardLayout from "../adminDashboard/adminDashboardLayout/AdminDashboardLayout";
import AdminLogin from "../page-layout-componenets/AdminLogin";
import ResetPassword from "../adminDashboard/pages/ResetPassword";
import ForgetPassword from "../adminDashboard/pages/ForgetPassword";

const WebAndDashRoute = () => {
  return (
    <Routes>
      <Route path="/*" element={<HomeRoute />} />
      <Route path="/login" element={<AdminLogin />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
      <Route
        path="/password-reset/validate/:uidb64/:token"
        element={<ResetPassword />}
      />
      <Route element={<ProtectedRoute />}>
        <Route path="/admin-dashboard/*" element={<AdminDashboardLayout />} />
      </Route>
    </Routes>
  );
};

export default WebAndDashRoute;
