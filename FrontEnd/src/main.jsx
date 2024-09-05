import  React  from "react";
import  ReactDOM  from "react-dom/client";
// import App from "./App.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import PageLayout from "./layouts/Pagelayout.jsx";
import AdminManagement from "./pages/AdminManagement.jsx";
import CounselorManagement from "./pages/CounselorManagement.jsx";
import Category from "./pages/Category/Category.jsx";
import Question from "./pages/Question/Question.jsx";
import Cat from "./pages/Category/Cat.jsx";
import EditCategory from "./pages/Category/EditCategory.jsx";
import CategoryList from "./pages/Category/CategoryList.jsx";

import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    element: <PageLayout />, 
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/admin-management", element: <AdminManagement /> },
      { path: "/counselor-management", element: <CounselorManagement /> },
      { path: "/manage-question", element: <Question /> },
      { path: "/manage-category", element: <Category /> },
      { path: "/categorylist", element: <CategoryList /> },
      { path: "/category/:id", element: <Cat /> },
      { path: "/category/:id/edit", element: <EditCategory /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <RouterProvider router={router}/>
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
