import jwt_decode from "jwt-decode";
const useAuth = () => {
  const token = localStorage.getItem("refresh_jung");
  let decoded = {};
  let bol = true;
  let role = "";
  if (token) {
    decoded = jwt_decode(token);
    role = decoded.role;
    if (decoded.exp < new Date().getTime() / 1000) {
      localStorage.clear();
      bol = false;
    }
  } else {
    bol = false;
  }
  return { bol, role };
};
export default useAuth;
