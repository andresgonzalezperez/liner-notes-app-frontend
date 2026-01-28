import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config/config";

function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API_URL}/auth/signup`, {
        username,
        email,
        password,
      });

      navigate("/login");
    } catch (err) {
      const msg = err.response?.data?.message;

      if (msg === "EMAIL_EXISTS") {
        setErrorMessage("This email belongs to an existing account");
      } else if (msg === "USERNAME_EXISTS") {
        setErrorMessage("This username is not available");
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Signup</h2>

      {errorMessage && <p className="auth-error">{errorMessage}</p>}

      <input
        type="text"
        placeholder="Username"
        className="auth-input"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="email"
        placeholder="Email"
        className="auth-input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="auth-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="auth-button" type="submit">
        Create Account
      </button>
    </form>
  );
}

export default Signup;

