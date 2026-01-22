import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/Liner-Notes-logo-500x500.png";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="nav-logo">
          <img src={logo} alt="Liner Notes Logo" className="logo-img" />
        </Link>

        <Link to="/albums" className="nav-link">Albums</Link>
        <Link to="/artists" className="nav-link">Artists</Link>
      </div>

      <div className="nav-right">
        {!isLoggedIn && (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/signup" className="nav-link">Signup</Link>
          </>
        )}

        {isLoggedIn && (
          <>
            <Link to="/profile" className="nav-profile-btn">
              My Profile
            </Link>

            <span className="nav-user">Hi, {user?.username}</span>

            <button className="nav-button" onClick={logOutUser}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;



