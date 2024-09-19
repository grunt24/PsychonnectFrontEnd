import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getCategoryById, updateCategory } from "../../../api/categoryService"; // Adjust the import path if necessary

const EditCategory = () => {
  const { id } = useParams(); // Get the category ID from the URL
  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState("");

  // Fetch the category data by ID
  const { isLoading, isError } = useQuery({
    queryKey: ["category", id],
    queryFn: () => getCategoryById(id),
    enabled: !!id, // Only run the query if the id is present
    onSuccess: (data) => {
      setCategoryName(data.categoryName); // Set the initial category name when data is fetched
    },
    onError: () => {
      Swal.fire("Error!", "Failed to fetch the category.", "error");
    },
  });

  // Mutation to update the category
  const mutation = useMutation({
    mutationFn: (updatedCategory) => updateCategory(id, updatedCategory),
    onSuccess: () => {
      Swal.fire("Success!", "Category updated successfully.", "success");
      navigate("/CategoryList"); // Navigate back to category list after a successful update
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.message || "Failed to update the category.";
      Swal.fire("Error!", errorMessage, "error");
    },
  });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ categoryName });
  };

  // Render loading state
  if (isLoading) return <p>Loading category data...</p>;

  // Render error state
  if (isError) return <p>Error loading category data.</p>;

  return (
    <div>
      <h1>Edit Category</h1>
      <button onClick={() => navigate("/CategoryList")}>Back</button>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Category Name"
        />
        <button type="submit" disabled={mutation.isLoading}>
          {mutation.isLoading ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
};

export default EditCategory;
