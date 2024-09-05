import { Button, Layout } from "antd";
const { Header } = Layout;
import { useState } from "react";
import { MenuOutlined } from "@ant-design/icons";

const HeaderLayout = () => {
    const [collapsed, setCollapsed] = useState(false);


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
          <MenuOutlined
            style={{ fontSize: "25px", paddingLeft: "20px" }}
          />
        )
      }
    />
    <span className="logo-text">BCAS Psychonnect</span>
  </Header>
  )
}

export default HeaderLayout
