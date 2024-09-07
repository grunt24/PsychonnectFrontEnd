import { Outlet } from "react-router-dom";
import SideBar from "./Sidebar";
import Header from "./HeaderLayout";
import { Layout } from "antd";
import Breadcrumbs from "./Breadcrumbs";
const { Content } = Layout;


const PageLayout = () => {
  return (
    <>
      <Layout>
        <SideBar />
        <Layout>
          <Header />
          <Breadcrumbs />
          <Content>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default PageLayout;
