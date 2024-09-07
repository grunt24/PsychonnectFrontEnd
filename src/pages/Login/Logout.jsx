import React from "react";
import { useNavigate } from "react-router-dom";
import loginService from "../../apis/loginService";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    loginService.logout(); // Clear the token from localStorage
    navigate("/login"); // Redirect to login page
  };

  return <div>Logout</div>;
};

export default Logout;
