import { Layout, Table, Spin, Alert, theme } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { getUsers } from '../api/userService'; // Adjust the import path

const { Content } = Layout;

const roleColors = {
  admin: '#FF4B2B',
  user: '#4A90E2',
  counselor: '#32B73A',
  owner: '#F5A623',
};

const UserManagement = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { data: users, error, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers
  });

  // Function to get color based on role
  const getRoleColor = (role) => roleColors[role.toLowerCase()] || '#FFFFFF'; // Default to white if role is unknown

  const columns = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Username',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: date => new Date(date).toLocaleDateString(), // Format date as needed
    },
    {
      title: 'Roles',
      dataIndex: 'roles',
      key: 'roles',
      render: roles => (
        <div style={{ display: 'flex', gap: '8px' }}>
          {roles.map(role => (
            <div
              key={role}
              style={{
                padding: 10,
                borderRadius: '50%', // Makes the div circular
                backgroundColor: getRoleColor(role), // Background color based on role
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF', // Text color, adjust as needed
                fontWeight: 'bold',
                fontSize: '12px',
                textAlign: 'center',
              }}
            >
              {role.toUpperCase()} {/* Display the first letter of the role */}
            </div>
          ))}
        </div>
      ),
    },
    {
      title: 'Operations',
      dataIndex: 'operations',
      key: 'operations',
    },
  ];

  return (
    <Layout>
      {/* Content */}
      <Content
        style={{
          margin: '24px 16px 0',
          overflow: 'initial',
        }}
      >
        <div
          style={{
            padding: 24,
            textAlign: 'center',
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <h2>Users List</h2>
          {isLoading ? (
            <Spin tip="Loading..." />
          ) : error ? (
            <Alert message={error.message} type="error" />
          ) : (
            <Table dataSource={users} columns={columns} rowKey="id" />
          )}
        </div>
      </Content>
      {/* End Content */}
    </Layout>
  );
};

export default UserManagement;
