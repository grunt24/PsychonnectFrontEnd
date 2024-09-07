import { Menu } from "antd";
import {
  HomeFilled,
  ContainerFilled,
  RightOutlined,
  UserOutlined,
  IdcardFilled,
  MessageFilled,
  BookFilled,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import loginService from "../api/loginService";

const MenuList = () => {
  const token = loginService.getToken(); // Check if token exists

  const handleLogout = () => {
    loginService.logout();
    window.location.href = "/login"; // Redirect to login page
  };
  return (
    <Menu theme="light" mode="inline" className="menu-bar">
      <Menu.Item key={"home"} icon={<HomeFilled />}>
        <Link Link to="/dashboard">
          Dashboard
        </Link>
      </Menu.Item>
      <Menu.Item key={"Admin"} icon={<IdcardFilled />}>
        <Link Link to="/admin-management">
          Admin Management
        </Link>
      </Menu.Item>
      <Menu.Item key={"Counselor"} icon={<UserOutlined />}>
        <Link Link to="/counselor-management">
          Counselor Management
        </Link>
      </Menu.Item>

      <Menu.SubMenu
        key={"Assessment"}
        icon={<ContainerFilled />}
        title="Assessment Management"
      >
        <Menu.Item key={"assessmentSubtask-1"} icon={<RightOutlined />}>
          <Link Link to="/manage-category">
            Category
          </Link>
        </Menu.Item>
        <Menu.Item
          key={"assessmentSubtask-2"}
          icon={<RightOutlined />}
          title="Quesionnaire"
        >
          <Link Link to={"/manage-question"}>
            Question
          </Link>
        </Menu.Item>
      </Menu.SubMenu>

      <Menu.Item key={"Mesassage"} icon={<MessageFilled />}>
        <Link Link to="#">
          Message Management
        </Link>
      </Menu.Item>
      <Menu.Item key={"Logs"} icon={<BookFilled />}>
        <Link Link to="#">
          Log Management
        </Link>
      </Menu.Item>
      <Menu.Item key={"CatList"} icon={<BookFilled />}>
        <Link Link to="/CategoryList">
          Category List
        </Link>
      </Menu.Item>
      <Menu.Item key={"/"} icon={<BsPersonCircle />}>
        {/* <a className="btn" href="/Login"> */}
        {token ? (
          <a className="btn" onClick={handleLogout}>
            Logout
          </a>
        ) : (
          // Show logout button if token exists
          <Link className="btn" to="/">
            Login
          </Link>
          // Show login link if no token
        )}
      </Menu.Item>
    </Menu>
  );
};

export default MenuList;
