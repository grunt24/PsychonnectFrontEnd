import { useMutation } from '@tanstack/react-query'
import CategoryForm from './CategoryForm'
import { createCategory } from '../../api/categoryService'

const AddCategory = () => {

  const createCategoryMutation = useMutation({
    mutationFn: createCategory
  });

  const handleAddCategory = (categories) => {
    createCategoryMutation.mutate({
      ...categories
    });
  }

  return (
    <div>
        <CategoryForm onSubmit={handleAddCategory}/>
    </div>
  )
}

export default AddCategory