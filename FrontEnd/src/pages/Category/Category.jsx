import { Layout, theme, Table } from "antd";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../api/categoryService";
import AddCategory from "./AddCategory";
import moment from "moment"; // Import Moment.js

const { Content } = Layout;

const Category = () => {
  const [sortedInfo, setSortedInfo] = useState({});

  const handleChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Define the columns with sorting logic
  const columns = [
    {
      title: "Category Name",
      width: 150,
      dataIndex: "categoryName",
      key: "categoryName",
      sorter: (a, b) => a.categoryName.localeCompare(b.categoryName),
      sortOrder: sortedInfo.columnKey === "categoryName" ? sortedInfo.order : null,
    },
    {
      title: "Created At",
      width: 150,
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      sortOrder: sortedInfo.columnKey === "createdAt" ? sortedInfo.order : null,
      render: (text) => moment(text).format('YYYY-MM-DD HH:mm:ss'), // Format date
    },
    {
      title: "Updated At",
      width: 150,
      dataIndex: "updatedAt",
      key: "updatedAt",
      sorter: (a, b) => new Date(a.updatedAt) - new Date(b.updatedAt),
      sortOrder: sortedInfo.columnKey === "updatedAt" ? sortedInfo.order : null,
      render: (text) => moment(text).format('YYYY-MM-DD HH:mm:ss'), // Format date
    },
    // {
    //   title: "Action",
    //   width: 150,
    //   dataIndex: "",
    //   key: "",
    // },
  ];

  const {
    data: categories,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  if (isFetching) return <h1>Loading...</h1>;

  // Handle error
  if (error) {
    return <div className="error">Error: {error.message}</div>;
  }

  return (
    <>
      {/* Content */}
      <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
        <AddCategory/>
        <div
          style={{
            padding: 24,
            textAlign: "center",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <h1>Category List</h1>
          <div style={{ overflowX: "auto" }}>
            <Table
              columns={columns}
              dataSource={categories}
              onChange={handleChange}
              rowKey="id"
              bordered
              scroll={{
                x: 'max-content',
                y: 300,
              }}
            />
          </div>
        </div>
      </Content>
      {/* End Content */}
    </>
  );
};

export default Category;
