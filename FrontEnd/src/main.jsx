import  React  from "react";
import  ReactDOM  from "react-dom/client";
// import App from "./App.jsx";
import "./index.css";
import {Dashboard, AdminManagement, Category, Question, EditCategory, PageLayout, Login} from './index.js'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Inbox from "./pages/Inbox/Inbox.jsx";
import ComingSoonModal from "./pages/ComingSoonModal.jsx";
import UserManagement from "./pages/UserManagement.jsx";
import Homepage from './pages/UserPage/Homepage.jsx'
import Point from "./pages/AssessmentManagement/Point/Point.jsx";
import UnauthorizedPage from "./pages/Unauthorized.jsx";

const queryClient = new QueryClient();


const router = createBrowserRouter([
  { 
    element: <PageLayout />, 
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/admin-management", element: <AdminManagement /> },
      // { path: "/counselor-management", element: <CounselorManagement /> },
      { path: "/manage-question", element: <Question /> },
      { path: "/manage-category", element: <Category /> },
      // { path: "/category/:id", element: <Cat /> },
      { path: "/category/:id/edit", element: <EditCategory /> },
      { path: "/inbox", element: <Inbox /> },
      { path: "/coming-soon", element: <ComingSoonModal /> },
      { path: "/user-management", element: <UserManagement /> },
      { path: "/point", element: <Point /> },
      { path: "/unauthorized", element: <UnauthorizedPage /> },




    ],
  },

  { path: "/", element: <Login /> },
  { path: "/homepage", element: <Homepage /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <RouterProvider router={router}/>
    {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  </React.StrictMode>
);
