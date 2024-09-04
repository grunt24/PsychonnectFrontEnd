import { useState } from "react";


const CategoryForm = ( onSubmit ) => {

    const [categories, setCateogories] = useState({
        categoryName: "",
    });

    const handleChangeInput = (e) => {
        setCateogories({
            ...categories,
            [e.target.name]: e.target.value
        })
    }

    const renderField = (label) => (
        <div>
            <label>{label}</label>
            <input onChange={handleChangeInput} type="text" name={label.toLowerCase()} value={categories[label.toLowerCase()]} />
        </div>
    );

    const handleSubmit = (e) => {
        e.preventDefault(); 
        onSubmit(categories);
        setCateogories({
            categoryName: "",
        })  
        
    }

  return (
    <form onSubmit={handleSubmit}>
        {renderField('Category Name')}
        <button type ="submit">Submit</button>
    </form>
  )
}

export default CategoryForm