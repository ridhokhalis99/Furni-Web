import { Navigate } from "react-router-dom";

function LoginProtector(props) {
  const auth = localStorage.getItem("access_token");
  if (auth) return <Navigate to="/products" />;
  return props.children;
}

export default LoginProtector;
