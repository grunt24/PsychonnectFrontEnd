import { Button, Layout, theme, Table } from "antd";
const { Content } = Layout;
import { fetchAdminManagement } from "../api/adminService";
import { useState, useEffect } from "react";

const AdminManagement = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Column definitions
  const columns = [
    {
      title: "First Name",
      width: 150,
      dataIndex: "firstName",
      key: "firstName",
      fixed: "left",
    },
    {
      title: "Last Name",
      width: 150,
      dataIndex: "lastName",
      key: "lastName",
      fixed: "left",
    },
    {
      title: "Username",
      width: 100,
      dataIndex: "userName",
      key: "userName",
      fixed: "left",
    },
    {
      title: "Email",
      width: 200,
      dataIndex: "email",
      key: "email",
      fixed: "left",
    },
    {
      title: "Role",
      width: 50,
      dataIndex: "roles",
      key: "role",
      fixed: "left",
    },
    {
      title: "Created At",
      width: 100,
      dataIndex: "createdAt",
      key: "createdAt",
      fixed: "right",
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
  ];

  const [Admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: "createdAt",
    direction: "asc",
  });

  useEffect(() => {
    const loadAdmins = async () => {
      try {
        const data = await fetchAdminManagement(
          sortConfig.key,
          sortConfig.direction
        );
        // console.log("fetch Data: ", data);

        setAdmins(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadAdmins();
  }, [sortConfig]);

  const handleSort = (sorter) => {
    const { field, order } = sorter;
    setSortConfig({
      key: field,
      direction: order === "ascend" ? "asc" : "desc",
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
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

        <Table
          columns={columns}
          dataSource={Admins}
          rowKey="id" // Ensure each row has a unique key, assuming `id` is unique
          onChange={handleSort}
        />
      </div>
    </Content>
  );
};

export default AdminManagement;
