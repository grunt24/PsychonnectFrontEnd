// import { useEffect, useState } from 'react';
// import { Navigate } from 'react-router-dom';
// import loginService from './loginService'; // Adjust the path as needed

// const RoleBasedRedirect = () => {
//   const [role, setRole] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Fetch user details
//     const userDetails = loginService.getUserDetails();
//     if (userDetails) {
//       setRole(userDetails.roles[0] || 'Guest'); // Assuming roles[0] gives the primary role
//     } else {
//       setRole('Guest');
//     }
//     setLoading(false);
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>; // Customize loading indicator
//   }

//   // Redirect based on user role
//   if (role === 'Admin') {
//     return <Navigate to="/dashboard" />;
//   } else if (role === 'User') {
//     return <Navigate to="/homepage" />;
//   } else {
//     return <Navigate to="/" />; // Default redirect if no role found
//   }
// };

// export default RoleBasedRedirect;
