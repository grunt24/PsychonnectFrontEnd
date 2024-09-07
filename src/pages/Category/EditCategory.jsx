import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { updateCategory, getCategoryById } from "../../api/categoryService";
import CategoryForm from "./CategoryForm";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const EditCategory = () => {
  const { id } = useParams(); // Assume you are using react-router-dom to get the category ID from the URL
  const navigate = useNavigate();

  const [category, setCategory] = useState({
    categoryName: "",
  });

  // Fetch category data by ID
  useEffect(() => {
    const fetchCategory = async () => {
      const data = await getCategoryById(id);
      setCategory(data);
    };
    fetchCategory();
  }, [id]);

  // Mutation to update the category
  const mutation = useMutation((updatedCategory) => updateCategory(id, updatedCategory), {
    onSuccess: () => {
      Swal.fire("Success!", "Category updated successfully.", "success");
      navigate("/categories"); // Navigate back to category list after successful update
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.message || "Failed to update the category.";
      Swal.fire("Error!", errorMessage, "error");
    },
  });

  const handleFormSubmit = (values) => {
    mutation.mutate(values);
  };

  return (
    <div>
      <h1>Edit Category</h1>
      <CategoryForm initialValues={category} onSubmit={handleFormSubmit} />
    </div>
  );
};

export default EditCategory;
