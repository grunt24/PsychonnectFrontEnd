import { Button, Layout, theme, Breadcrumb } from "antd";
import Logo from "../components/Logo";
import MenuList from "../components/MenuList";
import { useState } from "react";
import { MenuOutlined } from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

const CounselorManagement = () => {

    const [collapsed, setCollapsed] = useState(false);
    const {
      token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
  

  return (
    <>
    <Layout>
      {/* Sidebar */}
      <Sider
        collapsed={collapsed}
        collapsible
        trigger={null}
        className="sidebar"
        width={280}
        
      >
        <Logo />
        <MenuList />
      </Sider>
      {/* End SideBar */}

      <Layout>
        {/* Header */}
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
        {/* End Header */}

        {/* Breadcrumb */}
        <Breadcrumb
          style={{
            margin: "25px",
          }}
        >
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          <Breadcrumb.Item>Counselor Management</Breadcrumb.Item>

        </Breadcrumb>
        {/* End Breadcrumb */}


        {/* Content */}
        <Content
          style={{
            margin: "24px 16px 0",
            overflow: "initial",
          }}
        >
          <div
            style={{
              padding: 24,
              textAlign: "center",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <p>long content</p>
            {
              // indicates very long content
              Array.from({
                length: 100,
              })
            }
          </div>
        </Content>
        {/* End Content */}
      </Layout>
    </Layout>
  </>
  )
}

export default CounselorManagement