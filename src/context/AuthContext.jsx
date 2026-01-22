import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

function AuthProviderWrapper({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const authenticateUser = () => {
    const storedToken = localStorage.getItem("authToken");

    // Detectar tokens corruptos o vacíos
    if (
      !storedToken ||
      storedToken === "null" ||
      storedToken === "undefined" ||
      storedToken.trim() === ""
    ) {
      localStorage.removeItem("authToken");
      setIsLoggedIn(false);
      setIsLoading(false);
      setUser(null);
      return;
    }

    axios
      .get("http://localhost:5005/auth/verify", {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((res) => {
        setIsLoggedIn(true);
        setIsLoading(false);
        setUser(res.data);
      })
      .catch(() => {
        // Si el token es inválido, lo limpiamos
        localStorage.removeItem("authToken");
        setIsLoggedIn(false);
        setIsLoading(false);
        setUser(null);
      });
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  const logOutUser = () => {
    localStorage.removeItem("authToken");
    authenticateUser();
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        authenticateUser,
        logOutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProviderWrapper };

