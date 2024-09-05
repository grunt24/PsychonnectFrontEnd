import { Layout, theme, Table, Spin } from "antd";
import { useState } from "react";
import { getQuestions, getCategories } from "../../api/questionService";
import { useQuery } from "@tanstack/react-query";
const { Content } = Layout;

const Question = () => {
  const [sortedInfo, setSortedInfo] = useState({});

  const handleChange = (sorter) => {
    setSortedInfo(sorter);
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Define table columns
  const columns = [
    {
      title: "Question",
      width: 100,
      dataIndex: "questionText",
      key: "questionText",
      sorter: (a, b) => a.questionText.localeCompare(b.questionText),
      sortOrder: sortedInfo.columnKey === "questionText" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Category",
      width: 150,
      dataIndex: "categoryName",
      key: "categoryName",
      sorter: (a, b) => a.categoryName.localeCompare(b.categoryName),
      sortOrder: sortedInfo.columnKey === "categoryName" ? sortedInfo.order : null,
      ellipsis: true,
      filters: [
        { text: "Depression", value: "Depression" },
        { text: "Anxiety", value: "Anxiety" },
        { text: "Stress", value: "Stress" },
      ],
      onFilter: (value, record) => record.categoryName === value,
    },
    {
      title: "Created At",
      width: 150,
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      sortOrder: sortedInfo.columnKey === "createdAt" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Updated At",
      width: 150,
      dataIndex: "updatedAt",
      key: "updatedAt",
      sorter: (a, b) => new Date(a.updatedAt) - new Date(b.updatedAt),
      sortOrder: sortedInfo.columnKey === "updatedAt" ? sortedInfo.order : null,
      ellipsis: true,
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

  // Handle loading state
  const isLoading = isFetchingQuestions || isFetchingCategories;

  // Handle error for questions and categories
  if (questionsError || categoriesError) {
    return <div className="error">Error: Error fetching data</div>;
  }

  // Create a map of categoryId to categoryName
  const categoryMap = categories?.reduce((map, category) => {
    map[category.id] = category.categoryName;
    return map;
  }, {});

  // Format questions data to replace categoryId with categoryName
  const formattedQuestions = questions?.map((question) => ({
    ...question,
    categoryName: categoryMap?.[question.categoryId] || "Unknown Category",
  }));

  return (
    <Spin spinning={isLoading} size="large" tip="Loading... ">
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
              <div style={{ overflowX: "auto" }}>
                <Table
                  columns={columns}
                  dataSource={formattedQuestions}
                  onChange={handleChange}
                  rowKey="id"
                  bordered
                  scroll={{
                    x: "max-content",
                    y: 300,
                  }}
                />
              </div>
            </div>
        </Content>
        {/* End Content */}
    </Spin>

  );
};

export default Question;
