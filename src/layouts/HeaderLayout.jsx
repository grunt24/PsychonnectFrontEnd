import { Button, Layout } from "antd";
const { Header } = Layout;
import { useState } from "react";
import { MenuOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import loginService from "../api/loginService";

const HeaderLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const token = loginService.getToken(); // Check if token exists

  const handleLogout = () => {
    loginService.logout();
    window.location.href = "/Login"; // Redirect to login page
  };

  return (
    <Header className="Header" style={{ padding: 0 }}>
      <Button
        type="text"
        className="toggle"
        onClick={() => setCollapsed(!collapsed)}
        icon={
          collapsed ? (
            <MenuOutlined />
          ) : (
            <MenuOutlined style={{ fontSize: "25px", paddingLeft: "20px" }} />
          )
        }
      />
      <span className="logo-text">BCAS Psychonnect</span>
    </Header>
  );
};

export default HeaderLayout;
