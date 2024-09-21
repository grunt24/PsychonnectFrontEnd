import React, { useState, useEffect } from "react";
import _axiosInstance from "../../api/_axiosInstance";

import { MdOutput, MdInput } from "react-icons/md";
import { toast } from "react-toastify";
import moment from "moment";
// import Spinner from "../../layouts/Spinner";
// import { useAuth } from "./useAuth"; // Assuming this is a custom hook

const MY_MESSAGE_URL = "/Messages";

const InboxPage = () => {
  //   const { user } = useAuth();
  const [user, setUser] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const getMyMessages = async () => {
    try {
      setLoading(true);
      const response = await _axiosInstance.get(MY_MESSAGE_URL);
      const { data } = response;
      setMessages(data);
      setLoading(false);
    } catch (error) {
      toast.error("An Error happened. Please contact admins");
      setLoading(false);
    }
  };

  useEffect(() => {
    getMyMessages();
  }, []);

  if (loading) {
    return <div className="w-full">Loading</div>;
  }

  return (
    <div className="pageTemplate2">
      <h1 className="text-2xl font-bold">Inbox</h1>
      <div className="pageTemplate3 items-stretch">
        <div className="grid grid-cols-8 p-2 border-2 border-gray-200 rounded-lg">
          <span>Date</span>
          <span>Type</span>
          <span className="col-span-4">Text</span>
          <span>Sender</span>
          <span>Receiver</span>
        </div>
        {messages.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-8 p-2 border-2 border-gray-200 rounded-lg"
          >
            <span>{moment(item.createdAt).fromNow()}</span>
            <span>
              {item.senderUserName === user?.userName ? (
                <MdOutput className="text-2xl text-purple-500" />
              ) : (
                <MdInput className="text-2xl text-green-500" />
              )}
            </span>
            <span className="col-span-4">{item.text}</span>
            <span>{item.senderUserName}</span>
            <span>{item.receiverUserName}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InboxPage;
