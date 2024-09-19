import { Menu } from "antd";
import {
  HomeFilled,
  ContainerFilled,
  RightOutlined,
  UserOutlined,
  IdcardFilled,
  BookFilled,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const MenuList = () => {
  
  
  const handleCounselorClick = () => {
    Swal.fire({
      title: 'Coming Soon',
      html: `
        <div style="text-align: center;">
          <p style="font-size: 24px; color: #ff4d4f;">🚧</p>
          <h2>We are working on it!</h2>
          <p>This page is coming soon. Stay tuned!</p>
        </div>
      `,
      icon: 'info',
      customClass: {
        container: 'my-swal-container' // Optional: for custom styling
      },
      width: '90%',
      heightAuto: true,
      position: 'center',
      timer: 3000, // Duration of the alert in milliseconds (e.g., 3000 ms = 3 seconds)
      timerProgressBar: true,
      showConfirmButton: false, // Hides the OK button
    });
  };

  // Define menu items using the `items` prop
  const menuItems = [
    {
      key: "home",
      icon: <HomeFilled />,
      label: <Link to="/dashboard">Dashboard</Link>,
    },
    {
      key: "Admin",
      icon: <IdcardFilled />,
      label: "Admin Management",
      children: [
        {
          key: "assessmentSubtask-1",
          icon: <UserOutlined />,
          label: <Link to="/user-management">User Management</Link>,
        },
        {
          key: "assessmentSubtask-2",
          icon: <UserOutlined />,
          label: <a onClick={handleCounselorClick}>Student Management</a> // Trigger SweetAlert on click

        },
      ],
    },
    {
      key: "Assessment",
      icon: <ContainerFilled />,
      label: "Assessment Management",
      children: [
        {
          key: "assessmentSubtask-1",
          icon: <RightOutlined />,
          label: <Link to="/manage-category">Category</Link>,
        },
        {
          key: "assessmentSubtask-2",
          icon: <RightOutlined />,
          label: <Link to="/manage-question">Question</Link>,
        },
        {
          key: "assessmentSubtask-3",
          icon: <RightOutlined />,
          label: <Link to="/point">Pointings</Link>,
        },
        {
          key: "assessmentSubtask-4",
          icon: <RightOutlined />,
          label: <Link to="/questionnaire">Questionnaire</Link>,
        },
      ],
    },
    {
      key: "Inbox",
      icon: <BookFilled />,
      label: <a onClick={handleCounselorClick}>Inbox</a>
    },
  ];

  return <Menu theme="light" mode="inline" className="menu-bar" items={menuItems} />;
};

export default MenuList;
