import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/Liner-Notes-logo-500x500.png";
import defaultAvatar from "../assets/default-avatar.png";
import SearchBar from "./SearchBar";

function Navbar() {
  const { isLoggedIn, isAdmin, user, logOutUser } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        {/* Left side */}
        <div className="nav-left">
          <Link to="/albums" className="nav-link">
            Albums
          </Link>
          <Link to="/artists" className="nav-link">
            Artists
          </Link>
          {isLoggedIn && (
            <Link to="/my-favorites" className="nav-link">
              My Favorites
            </Link>
          )}
          {isLoggedIn && isAdmin && (
            <Link to="/admin/dashboard" className="nav-link">
              Admin Dashboard
            </Link>
          )}
        </div>

        {/* Center logo */}
        <div className="nav-center">
          <Link to="/" className="nav-logo">
            <img src={logo} alt="Liner Notes Logo" className="logo-img" />
          </Link>
        </div>

        {/* Right side */}
        <div className="nav-right">
          
          {/* SearchBar */}
          <div className="nav-search">
            <SearchBar />
          </div>

          {!isLoggedIn ? (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/signup" className="nav-link">
                Signup
              </Link>
            </>
          ) : (
            <>
              <Link to="/profile" className="nav-profile">
                <span className="nav-user">Hi, {user?.username}</span>
                <img
                  src={user?.avatar || defaultAvatar}
                  alt="avatar"
                  className="nav-avatar"
                />
              </Link>
              <button className="nav-button" onClick={logOutUser}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
