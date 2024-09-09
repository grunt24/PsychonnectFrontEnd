import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
import "./index.css";
import {
  Dashboard,
  AdminManagement,
  CounselorManagement,
  Category,
  Question,
  Cat,
  EditCategory,
  CategoryList,
  PageLayout,
} from "./index.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Login from "./pages/Login/Login.jsx";
import LogTable from "./pages/Logs/logTable.jsx";

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    element: <PageLayout />,
    children: [
      { path: "/", element: <Login /> },
      { path: "/login", element: <Login /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/admin-management", element: <AdminManagement /> },
      { path: "/counselor-management", element: <CounselorManagement /> },
      { path: "/manage-question", element: <Question /> },
      { path: "/manage-category", element: <Category /> },
      { path: "/categorylist", element: <CategoryList /> },
      { path: "/category/:id", element: <Cat /> },
      { path: "/category/:id/edit", element: <EditCategory /> },
      { path: "/logs", element: <LogTable /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
