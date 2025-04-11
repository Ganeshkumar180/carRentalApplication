import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();          // Calls logout from AuthContext
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h2 className="logo" onClick={() => navigate("/")}>CarRental</h2>
      <ul>
        <li><Link to="/cars">Cars</Link></li>

        {user ? (
          <>
            {user.role === "admin" && (
              <li><Link to="/admin">Admin</Link></li>
            )}
           { user.role!=="admin"&& (<li><Link to="/my-bookings">My Bookings</Link></li>)}
            
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
