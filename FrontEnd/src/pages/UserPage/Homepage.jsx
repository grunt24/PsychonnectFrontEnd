import { Layout, Button } from 'antd';
import './Homepage.css';
import Swal from "sweetalert2";
import { MdOutlineLogout } from "react-icons/md";
import loginService from "../../api/loginService";


const { Header, Content, Footer } = Layout;


const Homepage = () => {

    const handleLogout = () => {
        loginService.logout();
      };

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

  return (
    <Layout>
      <Header className="header">
        {/* <div className="demo-logo" /> */}
        <Button
              type="text"
              icon={<MdOutlineLogout />}
              onClick={handleLogout}
              style={{
                fontSize: "23px",
                fontWeight: 100,
                marginRight: 20,
                color: "white",
              }}
            >
              <span style={{ fontSize: 15, marginBottom: 5 }}>Logout</span>
            </Button>
      </Header>
      <Content
        style={{
          padding: '0 48px',
        }}
      >
        <div
          style={{
            padding: 24,
            minHeight: 380,
          }}
        >
          <div className="container">
            <div className="container__left">
              <h1>Psychonnect, there is a connection.</h1>
              <div className="container__btn">
                <a onClick={handleCounselorClick} className="btn btn-secondary">
                  START SHORT ASSESSMENT
                </a>
              </div>
            </div>
          </div>
        </div>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Psychonnect ©{new Date().getFullYear()} Created by Grunt
      </Footer>
    </Layout>
  );
};

export default Homepage;
