// // CreateCategory.js
// import { useState } from "react";
// import axios from "axios";
// import { useMutation } from "@tanstack/react-query"; // Use react-query hooks correctly

// const CreateCategory = () => {
//   const [categoryName, setCategoryName] = useState("");

//   // Setup mutation to post new category
//   const mutation = useMutation((newCategory) =>
//     axios.post("http://psychonnect-api.runasp.net/api/category", newCategory) // Ensure endpoint is correct
//   );

//   // Function to submit data
//   const submitData = () => {
//     mutation.mutate({ categoryName });
//   };

//   // Display different states of the mutation
//   if (mutation.isLoading) {
//     return <span>Submitting...</span>;
//   }

//   if (mutation.isError) {
//     return <span>Error: {mutation.error.message}</span>;
//   }

//   if (mutation.isSuccess) {
//     return <span>Category created successfully!</span>;
//   }

//   return (
//     <div>
//       <input
//         type="text"
//         value={categoryName}
//         onChange={(e) => setCategoryName(e.target.value)}
//         placeholder="Category Name"
//       />
//       <button onClick={submitData}>Submit</button>
//     </div>
//   );
// };

// export default CreateCategory;
