import { Layout, theme, Table } from "antd";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../api/categoryService";

const { Content } = Layout;

const Category = () => {
  const [sortedInfo, setSortedInfo] = useState({});

  const handleChange = ( sorter) => {
    setSortedInfo(sorter);
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Define the columns with sorting logic
  const columns = [
    {
      title: "Id",
      width: 150,
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
      sortOrder: sortedInfo.columnKey === "id" ? sortedInfo.order : null,
    },
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
    },
    {
      title: "Updated At",
      width: 150,
      dataIndex: "updatedAt",
      key: "updatedAt",
      sorter: (a, b) => new Date(a.updatedAt) - new Date(b.updatedAt),
      sortOrder: sortedInfo.columnKey === "updatedAt" ? sortedInfo.order : null,
    },
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
    return <div className="error">Error: error fetching</div>;
  }

  

  return (
    <>

          {/* Content */}
          <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
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
