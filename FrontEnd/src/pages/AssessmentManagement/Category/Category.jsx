import { Layout, theme, Table, Modal } from "antd";
import { useState } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getCategories, updateCategory, deleteCategory } from "../../../api/categoryService";
import AddCategory from "./AddCategory";
import moment from "moment";
import { EditFilled, DeleteFilled } from "@ant-design/icons"; // Import Ant Design Icons
import Swal from "sweetalert2";

const { Content } = Layout;

const Category = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [sortedInfo, setSortedInfo] = useState({});

  const handleChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Handle edit button click
  const handleEdit = (category) => {
    setSelectedCategory(category);
    setCategoryName(category.categoryName);
    setIsModalOpen(true);
  };

  // Mutation to update category
  const { mutate: updateCategoryMutation, isLoading: isUpdating } = useMutation({
    mutationFn: (updatedCategory) => updateCategory(selectedCategory.id, updatedCategory),
    onSuccess: () => {
      Swal.fire("Success!", "Category updated successfully.", "success");
      setIsModalOpen(false);
      queryClient.invalidateQueries(["categories"]);
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.message || "Failed to update the category.";
      Swal.fire("Error!", errorMessage, "error");
    },
  });

  // Mutation to delete category
  const { mutate: deleteCategoryMutation } = useMutation({
    mutationFn: (id) => deleteCategory(id),
    onSuccess: () => {
      Swal.fire("Deleted!", "Category has been deleted.", "success");
      queryClient.invalidateQueries(["categories"]); // Refresh categories after deletion
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.message || "Failed to delete the category.";
      Swal.fire("Error!", errorMessage, "error");
    },
  });

  // Handle delete with confirmation
  const handleDelete = (id, categoryName) => {
    Swal.fire({
      title: `Are you sure you want to delete the category "${categoryName}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCategoryMutation(id);
      }
    });
  };

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
      render: (text) => moment(text).format("YYYY-MM-DD HH:mm:ss"), // Format date
    },
    {
      title: "Updated At",
      width: 150,
      dataIndex: "updatedAt",
      key: "updatedAt",
      sorter: (a, b) => new Date(a.updatedAt) - new Date(b.updatedAt),
      sortOrder: sortedInfo.columnKey === "updatedAt" ? sortedInfo.order : null,
      render: (text) => moment(text).format("YYYY-MM-DD HH:mm:ss"), // Format date
    },
    {
      title: "Action",
      width: 50,
      key: "action",
      render: (_, record) => (
        <div style={{ textAlign: "center" }}>
          <a onClick={() => handleEdit(record)} style={{ marginRight: "8px", color: "blue" }}>
            <EditFilled />
          </a>
          <a
            style={{ marginRight: "8px", color: "red" }}
            onClick={() => handleDelete(record.id, record.categoryName)}
          >
            <DeleteFilled />
          </a>
        </div>
      ),
    },
  ];

  const { data: categories, isFetching, error } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  if (isFetching) return <h1>Loading...</h1>;

  // Handle error
  if (error) {
    return <div className="error">Error: {error.message}</div>;
  }

  // Handle form submission for updating the category
  const handleSubmit = (e) => {
    e.preventDefault();
    updateCategoryMutation({ categoryName });
  };

  return (
    <>
      {/* Content */}
      <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
        <AddCategory />
        <div
          style={{
            padding: 24,
            textAlign: "center",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <div
            style={{
              overflowX: "auto",
            }}
          >
            <Table
              style={{ height: "55vh" }}
              columns={columns}
              dataSource={categories}
              onChange={handleChange}
              rowKey="id"
              bordered
              scroll={{
                x: "max-content",
                y: 1500,
              }}
            />
          </div>
        </div>
      </Content>
      {/* End Content */}

      {/* Edit Modal */}
      <Modal
        title="Edit Category"
        open={isModalOpen} // Use 'open' instead of 'visible'
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Category Name"
          />
          <button type="submit" disabled={isUpdating}>
            {isUpdating ? "Updating..." : "Update"}
          </button>
        </form>
      </Modal>
    </>
  );
};

export default Category;
