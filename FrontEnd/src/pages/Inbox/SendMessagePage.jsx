import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import _axiosInstance from "../../api/_axiosInstance"; // Adjust the path based on your folder structure
import { toast } from "react-toastify";
import UsernameComboBox from "./UserNameComboBox"; // Adjust path
import InputField from "../../layouts/InputField"; // Adjust path
import Button from "../../layouts/Button"; // Adjust path
// import Spinner from "../../layouts/Spinner"; // Adjust path

const USERNAMES_LIST_URL = "/Auth/usernames"; // Replace with your actual API endpoint
const CREATE_MESSAGE_URL = "/Messages/create"; // Replace with your actual API endpoint
const PATH_INBOX = {
  inbox: "/inbox", // Replace with actual route
};
const SendMessagePage = () => {
  const [usernames, setUsernames] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const sendMessageSchema = Yup.object().shape({
    receiverUserName: Yup.string()
      .required("User Name is required")
      .oneOf(usernames, "Invalid username"),
    text: Yup.string().required("Message Text is required"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(sendMessageSchema),
    defaultValues: {
      receiverUserName: "",
      text: "",
    },
  });

  const getUsernamesList = async () => {
    try {
      setLoading(true);
      const response = await _axiosInstance.get(USERNAMES_LIST_URL);
      const { data } = response;
      setUsernames(data);
      setLoading(false);
    } catch (error) {
      toast.error("An Error happened. Please Contact admins");
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsernamesList();
  }, []);

  const onSubmitSendMessageForm = async (submittedData) => {
    try {
      setLoading(true);
      const newMessage = {
        receiverUserName: submittedData.receiverUserName,
        text: submittedData.text,
      };
      await _axiosInstance.post(CREATE_MESSAGE_URL, newMessage);
      setLoading(false);
      toast.success("Your message was sent successfully.");
      navigate(PATH_INBOX.inbox);
    } catch (error) {
      setLoading(false);
      reset();
      const err = error.response;
      if (err && err.status === 400) {
        toast.error(err.data);
      } else {
        toast.error("An Error occurred. Please contact admins");
      }
    }
  };

  if (loading) {
    return <div className="w-full">Loading</div>;
  }

  return (
    <div className="pageTemplate2">
      <h1 className="text-2xl font-bold">Send Message</h1>
      <div className="pageTemplate3 items-stretch">
        <form onSubmit={handleSubmit(onSubmitSendMessageForm)}>
          <UsernameComboBox
            usernames={usernames}
            control={control}
            name="receiverUserName"
            error={errors.receiverUserName?.message}
          />
          <InputField
            control={control}
            label="Text"
            inputName="text"
            error={errors.text?.message}
          />
          <div className="flex justify-center items-center gap-4 mt-6">
            <Button
              variant="secondary"
              type="button"
              label="Discard"
              onClick={() => navigate(PATH_INBOX.inbox)}
            />
            <Button
              variant="primary"
              type="submit"
              label="Send"
              onClick={() => {}}
              loading={loading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SendMessagePage;
