import { Button, Layout, theme, Breadcrumb, Card, Col, Row } from "antd";
import Logo from "./Logo";
import MenuList from "./MenuList";
import { useState } from "react";
import { MenuOutlined } from "@ant-design/icons";

const { Header, Sider, Content } = Layout;


function PageLayout() {
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
          </Breadcrumb>
          {/* End Breadcrumb */}

          {/* Card */}
          <Row 
          style={{ textAlign: 'center', justifyContent: 'space-evenly'}} 
          gutter={28}>
            <Col span={5}>
              <Card
                title="Total Admin"
                bordered={false}
                
              >
                10
              </Card>
            </Col>
            <Col span={5}>
              <Card
                title="Total Counselor"
                bordered={false}
                style={{  }}
              >
                Card content
              </Card>
            </Col>
            <Col span={5}>
              <Card
                title="Total Category"
                bordered={false}
                style={{  }}
              >
                Card content
              </Card>
            </Col>
            <Col span={5}>
              <Card
                title="Total Questions"
                bordered={false}
                style={{  }}
              >
                Card content
              </Card>
            </Col>
          </Row>
          {/* End Card */}

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
  );
}

export default PageLayout;
