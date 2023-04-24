import React from "react";

function AuthProvider({ children }) {
  const isLoggedIn = sessionStorage.getItem("token");

  return <>{isLoggedIn && children}</>;
}

export default AuthProvider;
