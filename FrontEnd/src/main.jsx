import  React  from "react";
import  ReactDOM  from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./routes/Dashboard.jsx";
import AdminManagement from "./routes/AdminManagement.jsx";
import CounselorManagement from "./routes/CounselorManagement.jsx";
import Category from "./routes/Category/Category.jsx";
import Question from "./routes/Question.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Cat from "./routes/Category/Cat.jsx";
import EditCategory from "./routes/Category/EditCategory.jsx";
import CategoryList from "./routes/Category/CategoryList.jsx";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


const queryClient = new QueryClient();
const router = createBrowserRouter([
  
  { path: "/", element: <App />, },
  { path: "/dashboard", element: <Dashboard />, },
  { path: "/admin-management", element: <AdminManagement />, },
  { path: "/counselor-management", element: <CounselorManagement />, },
  { path: "/manage-question", element: <Question />, },
  { path: "/manage-category", element: <Category />, },

  { path: "/categorylist", element: <CategoryList />, },
  { path: "/category/:id", element: <Cat />, },
  { path: "/category/:id/edit", element: <EditCategory />, },


]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <RouterProvider router={router}/>
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
