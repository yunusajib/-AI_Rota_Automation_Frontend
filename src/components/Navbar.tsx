import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const auth = useContext(AuthContext);

  return (
    <nav>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/shift-coverage">Shift Coverage</Link>
      {auth?.token && localStorage.getItem("role") === "manager" && (
        <>
          <Link to="/shift-requests">Shift Requests</Link>
          <Link to="/holiday-requests">Holiday Requests</Link>
        </>
      )}
      {auth?.token ? (
        <button onClick={auth.logout}>Logout</button>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
