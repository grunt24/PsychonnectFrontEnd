import { useState } from "react";
import { Input } from "antd"; // Ant Design components
import { SendOutlined } from "@ant-design/icons"; // Ant Design send icon
import Swal from "sweetalert2"; // Import SweetAlert2
import { createMessage } from "../../api/inboxService"; // Adjust this to match your service file path

const InboxForm = () => {
  const [text, setMessage] = useState(""); // State to handle input value

  // Handle input change
  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  // Handle message submission
  const handleSubmit = async () => {
    if (!text.trim()) {
      Swal.fire({
        title: "Error!",
        text: "Message cannot be empty.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    try {
      await createMessage({ content: text }); // Adjust the payload as needed for your API
      setMessage(""); // Clear input after sending
      Swal.fire({
        title: "Success!",
        text: "Message sent successfully.",
        icon: "success",
        timer: 2000, // Auto close after 2 seconds
        timerProgressBar: true,
        showConfirmButton: false, // No OK button needed
      });
    } catch (error) {
      // Handle errors gracefully
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "There was an issue sending the message.";

      Swal.fire({
        title: "Error!",
        text: errorMessage,
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  return (
    <div className="inbox-form">
      <Input
        placeholder="Type your message..."
        value={text}
        onChange={handleChange}
        onPressEnter={handleSubmit} // Allows pressing Enter to send
        suffix={
          <SendOutlined
            onClick={handleSubmit}
            style={{ cursor: "pointer", color: "#1890ff" }} // Send icon styling
          />
        }
      />
    </div>
  );
};

export default InboxForm;
