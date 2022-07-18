import { Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function ProtectedRoute(props) {
  const auth = localStorage.getItem("access_token");
  if (!auth) return <Navigate to="/login" />;
  return (
    <div>
      <Navbar />
      {props.children}
    </div>
  );
}

export default ProtectedRoute;
