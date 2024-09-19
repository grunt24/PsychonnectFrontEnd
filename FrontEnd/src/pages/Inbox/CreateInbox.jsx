import { useMutation } from "@tanstack/react-query"
import { createMessage } from '../../api/inboxService'
import InboxForm from "../Inbox/InboxForm";

const CreateInbox = () => {

    const createMessageMutation = useMutation({
        mutationFn: createMessage,
        onError: (error) => {
            console.error("Error creating category:", error); // Optional: Handle error if needed
        }
        });

  // Handle form submission
  const handleCreateMessage = (messages) => {
    createMessageMutation.mutate({
      ...messages,
    });
  };

  return (
    <>
        <InboxForm onSubnut={handleCreateMessage} />
    </>
  )
}

export default CreateInbox