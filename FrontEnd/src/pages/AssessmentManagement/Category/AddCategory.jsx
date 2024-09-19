import { useMutation } from "@tanstack/react-query";
import CategoryForm from "./CategoryForm";
import { createCategory } from "../../../api/categoryService";

const AddCategory = () => {
  // Mutation to create a category
  const createCategoryMutation = useMutation({
    mutationFn: createCategory,

    onError: (error) => {
      console.error("Error creating category:", error); // Optional: Handle error if needed
    }
  });

  // Handle form submission
  const handleAddCategory = (e, categories) => {
    e.preventDefault();
    createCategoryMutation.mutate({
      ...categories,
    });
  };

  return (
    <div>
      <CategoryForm onSubmit={handleAddCategory} />
    </div>
  );
};

export default AddCategory;
