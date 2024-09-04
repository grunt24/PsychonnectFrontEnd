import { Button, Layout, theme, Breadcrumb, Table } from "antd";
import Logo from "../../components/Logo";
import MenuList from "../../components/MenuList";
import { useState } from "react";
import { MenuOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { getCategories} from "../../api/categoryService";

const { Header, Sider, Content } = Layout;

const Category = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Define the columns with only Category Name
  const columns = [
    {
      title: 'Id',
      width: 150,
      dataIndex: 'id',
      key: 'id',
      fixed: 'left',
      sorter: true,
    },
    {
      title: 'Category Name',
      width: 150,
      dataIndex: 'categoryName',
      key: 'categoryName',
      fixed: 'left',
      sorter: true,
    },
    {
      title: 'Created At',
      width: 150,
      dataIndex: 'createdAt',
      key: 'createdAt',
      fixed: 'left',
      sorter: true,
    },
    {
      title: 'Updated At',
      width: 150,
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      fixed: 'left',
      sorter: true,
    },
  ];

  const {
    data: categories,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["categories"], // must be unique
    queryFn: getCategories,
  });

  if (isFetching) return <h1>Loading...</h1>;

  // Handle error
  if (error) {
    return <div className="error">Error: error fetching</div>;
  }

  return (
    <>

      <Layout>
        {/* Sidebar */}
        <Sider collapsed={collapsed} collapsible trigger={null} className="sidebar" width={280}>
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
                <MenuOutlined style={{ fontSize: "25px", paddingLeft: "20px" }} />
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
            <Breadcrumb.Item>Assessment Management</Breadcrumb.Item>
            <Breadcrumb.Item>Manage Category</Breadcrumb.Item>
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
              <h1>Category List</h1>

              <Table
                columns={columns}
                dataSource={categories}
                rowKey="id" // Assuming each category has a unique 'id' field
              />
            </div>
          </Content>
          {/* End Content */}
        </Layout>
      </Layout>
    </>
  );
};

export default Category;
