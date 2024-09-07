import AddCategory from "./AddCategory"
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../api/categoryService";
import { useNavigate } from "react-router-dom";

const CategoryList = () => {

    const navigate = useNavigate();

    const {
        isLoading,
        isError,
        error,
        data: categories,
      } = useQuery({
        queryKey: ["categories"], // must be unique
        queryFn: getCategories,
      });

      if (isLoading) {
        return <h1>Loading...</h1>;
      }
      if (isError) {
        return <h1>Error: {error.message}</h1>;
      }

  return (
    <div style={{textAlign: "center"}}>

        <AddCategory />
        {categories?.map((categories) => (
        <div key={categories.id}>
            <h4 style={{cursor: "pointer"}} onClick={() => navigate(`/category/${categories.id}`)}>
            {categories.categoryName}
            </h4>
            <button onClick={() => navigate(`/category/${categories.id}/edit`)}>Edit</button>
            <button>Delete</button>


        </div>
        ))}
    </div>
  )
}

export default CategoryList