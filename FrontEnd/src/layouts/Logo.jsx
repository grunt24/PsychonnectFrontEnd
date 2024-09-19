import { useEffect, useState } from 'react'; // Import useEffect and useState
import loginService from '../api/loginService'; // Adjust the path if needed
import '../assets/css/sider.css';

const Logo = () => {
  const [user, setUser] = useState({ userName: '', roles: [] });

  useEffect(() => {
    // Get user details on component mount
    const userDetails = loginService.getUserDetails();
    if (userDetails) {
      setUser({
        userName: userDetails.userName || 'Guest',
        roles: userDetails.roles || []
      });
    }
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <div
      style={{
        backgroundColor: '#f2fff2',
        height: 'max-content',
        borderBottom: '2px solid #ccc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      className="logo"
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '10px',
          textAlign: 'center'
        }}
      >
        <div className="app-title" style={{ fontSize: '20px', fontWeight: 'bold', color: 'rgb(0, 121, 107)' }}>
          BCAS-Psychonnect
        </div>
        <div className="user-greeting">
          <div className="greeting-msg" style={{ fontSize: '16px' }}>
            Welcome
          </div>
          <h4 className="user-name" style={{ margin: 0, fontSize: '18px',color: 'rgb(0, 121, 107)'  }}>
            {user.userName}
          </h4>
          {user.roles.length > 0 && (
            <h5 style={{ margin: '0px' }}>
              Role: {user.roles.join(', ')}
            </h5>
          )}
        </div>
      </div>
    </div>
  );
};

export default Logo;
