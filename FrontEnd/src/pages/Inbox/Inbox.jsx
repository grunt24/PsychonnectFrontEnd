import { useState } from "react";
import "./Inbox.css";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../api/userService"; // Adjust the import path as necessary
import { getMyMessages } from "../../api/inboxService"; // Adjust the import path as necessary
import CreateInbox from "./createInbox";

const parseJwt = (token) => {
  const base64Url = token.split('.')[1];
  const base64 = decodeURIComponent(atob(base64Url).replace(/(.)/g, function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }));
  return JSON.parse(base64);
};

const Inbox = () => {
  // State to track the selected user
  const [selectedUser, setSelectedUser] = useState(null);

  // Get the current user ID from the JWT token
  const token = localStorage.getItem("token"); // Adjust the way you get the token
  const decodedToken = token ? parseJwt(token) : null;
  const currentUserId = decodedToken?.userId; // Adjust based on your JWT structure

  // Fetch users
  const {
    data: users = [],
    isFetching: isFetchingUsers,
    error: userError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  // Fetch messages sent by the logged-in user to the selected user
  const {
    data: messages = [],
    isFetching: isFetchingMessages,
    error: messageError,
  } = useQuery({
    queryKey: ["messages", selectedUser?.id],
    queryFn: () => getMyMessages(selectedUser?.id),
    enabled: !!selectedUser, // Only fetch messages when a user is selected
  });

  // Handler to select a user and fetch their messages
  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="container">
      <div className="row clearfix">
        <div className="col-lg-12">
          <div className="card chat-app">
            <div id="plist" className="people-list">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-search"></i>
                  </span>
                </div>
              </div>
              {isFetchingUsers ? (
                <p>Loading users...</p>
              ) : userError ? (
                <p>Error fetching users: {userError.message}</p>
              ) : (
                <ul className="list-unstyled chat-list mt-2 mb-0">
                  {users.map((user) => (
                    <li
                      key={user.id}
                      className={`clearfix ${
                        selectedUser?.id === user.id ? "active" : ""
                      }`}
                      onClick={() => handleUserClick(user)}
                    >
                      <div className="about">
                        <div className="name">{user.userName}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="chat">
              <div className="chat-header clearfix">
                <div className="row">
                  <div className="col-lg-6">
                    {selectedUser && (
                      <div className="chat-about">
                        <h6 className="m-b-0">{selectedUser.userName}</h6>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="chat-history">
                {isFetchingMessages ? (
                  <p>Loading messages...</p>
                ) : messageError ? (
                  <p>Error fetching messages: {messageError.message}</p>
                ) : (
                  <ul className="m-b-0">
                    {messages.map((message) => (
                      <li key={message.id} className="clearfix">
                        {message.senderId === currentUserId ? (
                          // Message sent by the current user
                          <div className="message my-message">
                            <div className="message-data text-right">
                              <span className="message-data-time">
                                {message.timeSent}
                              </span>
                            </div>
                            {message.text}
                          </div>
                        ) : (
                          // Message received from someone else
                          <div className="message other-message float-right">
                            <div className="message-data text-right">
                              <span className="message-data-time">
                                {message.timeSent}
                              </span>
                            </div>
                            {message.text}
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="chat-message clearfix">
                <div className="input-group mb-0">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fa fa-send"></i>
                    </span>
                  </div>
                  <CreateInbox />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inbox;
