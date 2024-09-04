import { useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const AddCategory = () => {

  const [categories, setCategories] = useState("");

  const mutationRequest = useMutation((newCategory) => axios.post("http://psychonnect-api.runasp.net/api/", newCategory));

  const sendData = () => {
    mutationRequest.mutate({ categories });
  };

  if (mutationRequest.isLoading) {
    return <span>Submitting...</span>;
  }

  if (mutationRequest.isError) {
    return <span>Error: {mutationRequest.error.message}</span>;
  }

  if (mutationRequest.isSuccess) {
    return <span>Article submitted!</span>;
  }



  return (
    <div>
      <input type="text" value={categories} onChange={(e) => setCategories(e.target.value)} placeholder="categories" />
      <button onClick={sendData}>Submit</button>
    </div>
  )
}

export default AddCategory