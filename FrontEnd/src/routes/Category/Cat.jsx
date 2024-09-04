import { useParams } from "react-router-dom";
import { getCategoryById } from "../../api/categoryService";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const Cat = () => {
  const { id } = useParams(); // Get the category ID from the route parameters
  const navigate = useNavigate();

  // Fetch category by ID using react-query
  const {
    isLoading,
    isError,
    error,
    data: category, // Renamed to singular `category` for clarity
  } = useQuery({
    queryKey: ["category", id], // Unique query key for this specific ID
    queryFn: () => getCategoryById(id),
    enabled: !!id, // Only run the query if ID exists
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>Error: {error.message || "Failed to fetch category"}</h1>;
  }

  return (
    <div>
      <button onClick={() => navigate("/CategoryList")}>Back to list</button>
      <h1>{category?.categoryName || "Category not found"}</h1>
    </div>
  );
};

export default Cat;
