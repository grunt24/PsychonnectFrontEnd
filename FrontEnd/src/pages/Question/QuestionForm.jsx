import { useState } from "react"
import Swal from "sweetalert2"; // Import SweetAlert2
import {createQuestion} from '../../api/questionService'
import { Modal, Button, Input, Form } from "antd"; // Ant Design components


const QuestionForm = () => {
    const [question, setQuestion] = useState({
        questionText: "",
        categoryId: "",
    })

    const handleChangeInput = (e) => {
        setQuestion({
          ...question,
          [e.target.name]: e.target.value,
        });
      };

      const [isModalVisible, setIsModalVisible] = useState(false); // State to control modal visibility

      const handleSubmit = async () => {
        try {
          await createQuestion(question);
          setQuestion({
            questionText: "",
            categoryId: "",
          });
          setIsModalVisible(false); // Close modal after submitting
    
          // Refetch categories after successful creation
    
          // Show success alert with auto-close timer
          Swal.fire({
            title: "Success!",
            text: "Question created successfully.",
            icon: "success",
            timer: 2000, // Auto close after 2 seconds
            timerProgressBar: true,
            showConfirmButton: false, // No OK button needed
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
        <Button style={{Color: 'Black'}} onClick={showModal}>
        Add Question
      </Button>

      <Modal
        title="Create Category"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null} // Remove default footer buttons
      >
        <Form onFinish={handleSubmit}>
          <Form.Item required>
            <Input
              type="text"
              name="categoryName"
              value={question.questionText}
              onChange={handleChangeInput}
              placeholder="Enter Quesiton name"
            />
            <Input
              type="text"
              name="categoryName"
              value={question.categoryId}
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
  )
}

export default QuestionForm