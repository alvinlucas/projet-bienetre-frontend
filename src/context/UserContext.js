import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Utilisateur connecté
  const [token, setToken] = useState(null); // JWT token

  useEffect(() => {
    try {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      setUser(JSON.parse(storedUser)); // Convertir la chaîne JSON en objet
      setToken(storedToken);
    } catch (error) {
      setUser(null);
      setToken(null);
    }
  }, []);

  const login = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);
    localStorage.setItem("user", JSON.stringify(userData)); // Sauvegarder l'utilisateur
    localStorage.setItem("token", jwtToken); // Sauvegarder le token
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ user, token, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
