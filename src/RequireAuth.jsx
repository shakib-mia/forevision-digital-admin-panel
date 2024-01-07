import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const RequireAuth = ({ children }) => {
  const location = useLocation();
  if (localStorage.getItem("token") === null) {
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
  }
  return children;
};

RequireAuth.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RequireAuth;
