import { useState } from "react";
import { Modal, Button, Input, Form } from "antd"; // Ant Design components
import Swal from "sweetalert2"; // Import SweetAlert2
import { createCategory } from "../../../api/categoryService";

const CategoryForm = () => {
  const [categories, setCategories] = useState({
    categoryName: "",
  });

  const [isModalOpen, setIsModalVisible] = useState(false); // State to control modal visibility

  const handleChangeInput = (e) => {
    setCategories({
      ...categories,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      await createCategory(categories);
      setCategories({
        categoryName: "",
      });
      setIsModalVisible(false); // Close modal after submitting

      // Refetch categories after successful creation

      // Show success alert with auto-close timer
      Swal.fire({
        title: "Success!",
        text: "Category created successfully.",
        icon: "success",
        timer: 2000, // Auto close after 2 seconds
        timerProgressBar: true,
        showConfirmButton: false, // No OK button needed
      }).then(() => {
        // Reload the page after the alert closes
        window.location.reload();
      });
    } catch (error) {
      // Extract the error message from the response, if available
      const errorMessage =
        error?.response?.data?.message || // If error message from API
        error?.message || // General JavaScript error message
        "There was an issue creating the category."; // Fallback message

      // Show error alert with detailed message
      Swal.fire({
        title: "Error!",
        text: errorMessage,
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  // Show modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Hide modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button style={{marginLeft: 20}} type="primary" onClick={showModal}>
        Add Category
      </Button>
      <Modal
        title="Create Category"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null} // Remove default footer buttons
      >
        <Form onFinish={handleSubmit}>
          <Form.Item label="Category Name" required>
            <Input
              type="text"
              name="categoryName"
              value={categories.categoryName}
              onChange={handleChangeInput}
              placeholder="Enter category name"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CategoryForm;
