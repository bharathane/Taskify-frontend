import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
const PrivateRoutes = () => {
  const jwtToken = Cookies.get("jwt_token");
  if (jwtToken === undefined) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};
export default PrivateRoutes;
