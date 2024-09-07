import { Button, Layout, theme, Table } from "antd";
const { Content } = Layout;

const AdminManagement = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const columns = [
    {
      title: "First Name",
      width: 150,
      dataIndex: "firstname",
      key: "firstname",
      fixed: "left",
      sorter: true,
    },
    {
      title: "Last Name",
      width: 150,
      dataIndex: "lastname",
      key: "lastname",
      fixed: "left",
      sorter: true,
    },
    {
      title: "Username",
      width: 100,
      dataIndex: "username",
      key: "username",
      fixed: "left",
      sorter: true,
    },
    {
      title: "Email",
      width: 200,
      dataIndex: "email",
      key: "email",
      fixed: "left",
      sorter: true,
    },
    {
      title: "Role",
      width: 50,
      dataIndex: "role",
      key: "role",
      fixed: "left",
      sorter: true,
    },
    {
      title: "Created At",
      width: 100,
      dataIndex: "createdAt",
      key: "createdAt",
      fixed: "right",
      sorter: true,
    },
  ];

  const data = [
    {
      key: "1",
      firstname: "Brent",
      lastname: "De Leon",
      username: "brent",
      email: "brent@gmail.com",
      role: "Admin",
      createdAt: "2024-08",
    },
    {
      key: "2",
      firstname: "admin",
      lastname: "admin",
      username: "admin",
      email: "admin@gmail.com",
      role: "Owner",
      createdAt: "2024-08",
    },
  ];

  return (
    <>
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
              <Button
                // onClick={handleAdd}

                style={{
                  marginBottom: 16,
                  backgroundColor: "#00796B",
                  color: "white",
                }}
              >
                Add admin
              </Button>

              <Table columns={columns} dataSource={data} />

              {
                // indicates very long content
                Array.from({
                  length: 100,
                })
              }
            </div>
          </Content>
          {/* End Content */}
    </>
  );
};

export default AdminManagement;
