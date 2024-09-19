import { useState } from "react";
import Swal from "sweetalert2"; // Import SweetAlert2
import { createQuestion } from '../../../api/questionService';
import { getCategories } from "../../../api/categoryService"; // Import your API functions
import { Modal, Button, Input, Form, Select } from "antd"; // Ant Design components
import { useQuery } from '@tanstack/react-query'; // Import useQuery

const { Option } = Select;

const QuestionForm = () => {
  const [question, setQuestion] = useState({
    questionText: "",
    categoryId: "",
  });

  // Fetch categories using useQuery
  const { data: categories = [], isLoading, isError, error } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  const [isModalOpen, setIsModalVisible] = useState(false); // State to control modal visibility

  const handleChangeInput = (e) => {
    setQuestion({
      ...question,
      [e.target.name]: e.target.value,
    });
  };

  const handleCategoryChange = (value) => {
    setQuestion({
      ...question,
      categoryId: value,
    });
  };

  const handleSubmit = async () => {
    try {
      await createQuestion(question);
      setQuestion({
        questionText: "",
        categoryId: "",
      });
      setIsModalVisible(false); // Close modal after submitting

      // Show success alert with auto-close timer
      Swal.fire({
        title: "Success!",
        text: "Question created successfully.",
        icon: "success",
        timer: 2000, // Auto close after 2 seconds
        timerProgressBar: true,
        showConfirmButton: true, // No OK button needed
      }).then(() => {
        // Reload the page after the alert closes
        window.location.reload();
      });
    } catch (error) {
      // Extract the error message from the response, if available
      const errorMessage =
        error?.response?.data?.message || // If error message from API
        error?.message || // General JavaScript error message
        "There was an issue creating the question."; // Fallback message

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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add Question
      </Button>

      <Modal
        title="Create Question"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null} // Remove default footer buttons
      >
        <Form onFinish={handleSubmit}>
          <Form.Item label="Question Text" required>
            <Input
              type="text"
              name="questionText"
              value={question.questionText}
              onChange={handleChangeInput}
              placeholder="Enter question text"
            />
          </Form.Item>
          <Form.Item label="Category" required>
            <Select
              name="categoryId"
              value={question.categoryId}
              onChange={handleCategoryChange}
              placeholder="Select a category"
            >
              {categories.map((category) => (
                <Option key={category.id} value={category.id}>
                  {category.categoryName}
                </Option>
              ))}
            </Select>
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

export default QuestionForm;
