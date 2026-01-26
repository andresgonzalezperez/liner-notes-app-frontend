import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const { authenticateUser, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send login request
      const res = await axios.post("http://localhost:5005/auth/login", {
        email,
        password,
      });

      // Store token in localStorage
      localStorage.setItem("authToken", res.data.authToken);

      // Wait for AuthContext to refresh user data
      await authenticateUser();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Login</h2>

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
        Login
      </button>
    </form>
  );
}

export default Login;


