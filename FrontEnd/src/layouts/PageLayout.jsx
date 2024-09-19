import { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { MdOutlineLogout } from "react-icons/md";
import { Outlet } from "react-router-dom";
import { Button, Layout, theme } from "antd";
import Breadcrumbs from "./Breadcrumbs";
import MenuList from "./MenuList";
import Logo from "../layouts/Logo";
import "../assets/css/sider.css";
import loginService from "../api/loginService";

const { Sider, Content, Header } = Layout;

const PageLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleLogout = () => {
    loginService.logout();
  };

  return (
    <>
      <Layout>
        <Sider
          style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)", height: "100vh" }}
          theme="light"
          trigger={null}
          collapsible
          collapsed={collapsed}
          width={280}
        >
          <div className="demo-logo-vertical" />
          {!collapsed && <Logo />} {/* Hide Logo when collapsed */}
          <MenuList />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: "rgb(0, 121, 107)",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "20px",
                width: 64,
                height: 64,
                color: "white",
              }}
            />
            <Button
              type="text"
              icon={<MdOutlineLogout />}
              onClick={handleLogout}
              style={{
                fontSize: "23px",
                fontWeight: 100,
                marginRight: 20,
                color: "white",
              }}
            >
              <span style={{ fontSize: 15, marginBottom: 5 }}>Logout</span>
            </Button>
          </Header>
          <Breadcrumbs />

          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
              height: "auto",
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default PageLayout;
