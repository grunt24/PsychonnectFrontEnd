import { Button, Layout, theme, Breadcrumb, Table } from "antd";
import Logo from "../components/Logo";
import MenuList from "../components/MenuList";
import { useState } from "react";
import { MenuOutlined } from "@ant-design/icons";
import { getQuestions } from "../api/questionService";
import { getCategories } from "../api/categoryService";
import { useQuery } from "@tanstack/react-query";

const { Header, Sider, Content } = Layout;

const Question = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Define table columns
  const columns = [
    {
      title: 'Question',
      width: 150,
      dataIndex: 'questionText',
      key: 'questionText',
      fixed: 'left',
      sorter: true,
    },
    {
      title: 'Category',
      width: 150,
      dataIndex: 'categoryName', // Update to show category name instead of ID
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

  // Fetch questions
  const {
    data: questions,
    isFetching: isFetchingQuestions,
    error: questionsError,
  } = useQuery({
    queryKey: ["questions"],
    queryFn: getQuestions,
  });

  // Fetch categories to map categoryId to categoryName
  const {
    data: categories,
    isFetching: isFetchingCategories,
    error: categoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  // Show loading state while fetching data
  if (isFetchingQuestions || isFetchingCategories) return <h1>Loading...</h1>;

  // Handle error for questions and categories
  if (questionsError || categoriesError) {
    return <div className="error">Error: error fetching data</div>;
  }

  // Create a map of categoryId to categoryName
  const categoryMap = categories.reduce((map, category) => {
    map[category.id] = category.categoryName;
    return map;
  }, {});

  // Format questions data to replace categoryId with categoryName
  const formattedQuestions = questions.map((question) => ({
    ...question,
    categoryName: categoryMap[question.categoryId] || "Unknown Category", // Replace categoryId with corresponding name
  }));

  return (
    <>
      <Layout>
        {/* Sidebar */}
        <Sider collapsed={collapsed} collapsible trigger={null} className="sidebar" width={280}>
          <Logo />
          <MenuList />
        </Sider>
        {/* End Sidebar */}

        <Layout>
          {/* Header */}
          <Header className="Header" style={{ padding: 0 }}>
            <Button
              type="text"
              className="toggle"
              onClick={() => setCollapsed(!collapsed)}
              icon={<MenuOutlined style={{ fontSize: "25px", paddingLeft: "20px" }} />}
            />
            <span className="logo-text">BCAS Psychonnect</span>
          </Header>
          {/* End Header */}

          {/* Breadcrumb */}
          <Breadcrumb style={{ margin: "25px" }}>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item>Assessment Management</Breadcrumb.Item>
            <Breadcrumb.Item>Manage Question</Breadcrumb.Item>
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
              <h1>Question List</h1>

              <Table columns={columns} dataSource={formattedQuestions} rowKey="id" />
            </div>
          </Content>
          {/* End Content */}
        </Layout>
      </Layout>
    </>
  );
};

export default Question;
