import { useState } from "react";
import Swal from "sweetalert2"; // Import SweetAlert2
import { createPoints } from '../../../api/pointService'; // Import your API function
import { Modal, Button, Input, Form } from "antd"; // Ant Design components
// import { useQuery } from '@tanstack/react-query'; // Import useQuery

const PointForm = () => {
  const [point, setPoint] = useState({
    description: "",
    point: "",
  });

  const [isModalOpen, setIsModalVisible] = useState(false); // State to control modal visibility

  const handleChangeInput = (e) => {
    setPoint({
      ...point,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      await createPoints(point);
      setPoint({
        description: "",
        point: "",
      });
      setIsModalVisible(false); // Close modal after submitting

      // Show success alert with auto-close timer
      Swal.fire({
        title: "Success!",
        text: "Point created successfully.",
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
        "There was an issue creating the point."; // Fallback message

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
      <Button type="primary" onClick={showModal}>
        Add Point
      </Button>

      <Modal
        title="Create Point"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null} // Remove default footer buttons
      >
        <Form onFinish={handleSubmit}>
          <Form.Item label="Description" required>
            <Input
              type="text"
              name="description"
              value={point.description}
              onChange={handleChangeInput}
              placeholder="Enter point description"
            />
          </Form.Item>
          <Form.Item label="Point" required>
            <Input
              type="number"
              name="point"
              value={point.point}
              onChange={handleChangeInput}
              placeholder="Enter point value"
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

export default PointForm;
