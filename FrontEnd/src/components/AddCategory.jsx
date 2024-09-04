import { useMutation } from '@tanstack/react-query'
import CategoryForm from './CategoryForm'
import { createCategory } from '../api/categoryService'

const AddCategory = () => {

  const createCategoryMutation = useMutation({
    mutationFn: createCategory
  });

  const handleAddCategory = (categories) => {
    createCategoryMutation.mutate({
      id: 4,
      ...categories
    });
  }

  return (
    <div>AddCategory
        <CategoryForm onSubmit={handleAddCategory}/>
    </div>
  )
}

export default AddCategory