import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button, Row, Col, Typography } from "antd"; // Import Ant Design components
import loginService from '../../api/loginService'; // Import the loginService
import Swal from "sweetalert2"; // Import SweetAlert2
import { LuEye, LuEyeOff } from "react-icons/lu"; // Import the icons
import './Login.css';

const { Title, Text } = Typography;

const Login = () => {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Manage password visibility
  const navigate = useNavigate(); // Use navigate to redirect

  const handleSubmit = async (values) => {
    try {
      // Call loginService.login and pass userName and password
      const { success, userDetails } = await loginService.login(values.userName, values.password);

      if (success) {
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Login Successful',
          text: 'You will be redirected shortly.',
          timer: 2000, // Auto close after 2 seconds
          timerProgressBar: true,
          showConfirmButton: false,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        });

        // Check the user's role and navigate accordingly
        const roles = userDetails.roles;

        if (roles.includes("Admin")) {
          navigate("/dashboard"); // Redirect to dashboard for admin
        } else if (roles.includes("User")) {
          navigate("/homepage"); // Redirect to homepage for regular users
        } else {
          setError("Unrecognized user role.");
        }
      } else {
        throw new Error("Invalid username or password");
      }
    } catch (loginError) {
      console.error("Login failed:", loginError);

      Swal.fire({
        toast: true,
        position: 'top', // Positioning the toast at the top
        icon: 'error',
        title: 'Error!',
        text: 'Invalid username or password',
        timer: 2000, // Auto close after 2 seconds
        timerProgressBar: true,
        showConfirmButton: false,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
      });

      setError("Invalid username or password");
    }
  };

  return (
    <Row justify="center" align="middle" style={{ height: '100vh' }}>
      <Col xs={22} sm={18} md={12} lg={8} xl={6}>
        <div className="addUser">
          <div className="back">
            <Link to="/" className="btn btn-outline-danger">
              <span>
                <i className="bi bi-x-circle"></i>
              </span>
            </Link>
          </div>
          <Title level={3} className="login-title">LOGIN</Title>
          <Form
            layout="vertical"
            onFinish={handleSubmit}
            className="addUserForm"
          >
            <Form.Item
              label="Username"
              name="userName"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input
                placeholder="Enter your Username"
                value={userName}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Item>

            {error && <Text type="danger">Username is incorrect</Text>}

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password
                placeholder="Enter your Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                iconRender={visible =>
                  visible ? (
                    <LuEyeOff onClick={() => setShowPassword(!showPassword)} />
                  ) : (
                    <LuEye onClick={() => setShowPassword(!showPassword)} />
                  )
                }
              />
            </Form.Item>

            {error && <Text type="danger">Password is incorrect</Text>}

            <Form.Item>
              <Button
                type="primary"
                style={{ background: '#4CAF50', marginTop: 20 }}
                htmlType="submit"
                block
              >
                Login
              </Button>
            </Form.Item>
          </Form>

          {error && (
            <div className="error" style={{ color: 'red', marginTop: '10px' }}>
              Please try again
            </div>
          )}
        </div>
      </Col>
    </Row>
  );
};

export default Login;
