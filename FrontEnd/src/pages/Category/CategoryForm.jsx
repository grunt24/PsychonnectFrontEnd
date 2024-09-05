import { useState } from "react";
import { createCategory } from "../../api/categoryService";


const CategoryForm = () => {

    const [categories, setCateogories] = useState({
        categoryName: "",
    });

    const handleChangeInput = (e) => {
        setCateogories({
            ...categories,
            [e.target.name]: e.target.value
        })
    }

    const renderField = ({label,key}) => (
        <div>
            <label>{label}</label>
            <input onChange={handleChangeInput} type="text" name={key} value={categories[label]} />
        </div>
    );

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        await createCategory(categories)
        setCateogories({
            categoryName: "",
        })  
        
    }

  return (
    <form onSubmit={handleSubmit}>
        {renderField({label: "Category Name", key: "categoryName"})}
        <button type ="submit">Submit</button>
    </form>
  )
}

export default CategoryForm