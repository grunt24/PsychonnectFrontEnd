import { createQuestion } from '../../../api/questionService'
import QuestionForm from './QuestionForm';
import { useMutation } from '@tanstack/react-query';

const AddQuestion = () => {
    const createQuestionMutation = useMutation({
        mutationFn: createQuestion
      });

      const handleAddQuestion = async (questions) => {
        await createQuestionMutation.mutate({
          ...questions,
        });
      }

  return (
    <div>
        <QuestionForm onSubmit={handleAddQuestion}/>
    </div>
  )
}

export default AddQuestion