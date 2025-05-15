import React, { useEffect, useState, useRef } from "react";
import {
  getAllChatUsers,
  getChatHistory,
  sendMessage,
} from "../../services/chat";
import "./ChatWidget.css";
import { io } from "socket.io-client";

const socket = io("http://localhost:8080");
const ChatWidget = () => {
  const [chatUsers, setChatUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const chatRef = useRef(null);

  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  useEffect(() => {
    socket.connect();
    // Lắng nghe tin nhắn đến
    socket.emit("join", localStorage.getItem("userId"));
    socket.on("newMessage", (message) => {
      if (selectedUser && message.senderId === selectedUser) {
        setChatHistory((prev) => [...prev, message]);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [selectedUser]);

  // Lấy danh sách user từng nhắn
  useEffect(() => {
    const fetchChatUsers = async () => {
      try {
        const users = await getAllChatUsers();
        setChatUsers(users);
      } catch (err) {
        console.error("Lỗi khi lấy danh sách người dùng:", err);
      }
    };

    fetchChatUsers();
  }, []);

  // Lấy lịch sử chat khi chọn user
  useEffect(() => {
    if (selectedUser) {
      console.log("Selected user:", selectedUser);
      const fetchChatHistory = async () => {
        try {
          const history = await getChatHistory(selectedUser);
          setChatHistory(history);
        } catch (err) {
          console.error("Lỗi khi lấy lịch sử chat:", err);
        }
      };
      fetchChatHistory();
    }
  }, [selectedUser]);

  const handleSend = async () => {
    if (!newMessage.trim()) return;

    const messageData = {
      senderId: localStorage.getItem("userId"),
      receiverId: selectedUser,
      content: newMessage,
      isAdmin: true,
    };

    try {
      await sendMessage(messageData); // Lưu vào DB
      socket.emit("sendMessage", messageData); // Gửi socket
      setChatHistory((prev) => [...prev, { ...messageData, _id: Date.now() }]);
      setNewMessage("");
    } catch (err) {
      console.error("Lỗi khi gửi tin nhắn:", err);
    }
  };

  return (
    <div className="chat-widget-container">
      <div className="chat-users-list">
        <h3>Khách hàng</h3>
        {chatUsers.length === 0 ? (
          <p>Chưa có khách hàng nào nhắn.</p>
        ) : (
          chatUsers.map((user) => (
            <div
              key={user._id}
              className={`chat-user-box ${
                selectedUser?._id === user._id ? "selected" : ""
              }`}
              onClick={() => setSelectedUser(user)}
            >
              <span>{user.name || user.email || `ID: ${user}`}</span>
            </div>
          ))
        )}
      </div>

      <div className="chat-box">
        {selectedUser ? (
          <>
            <div className="chat-header">
              <h4>Chat với: {selectedUser}</h4>
            </div>
            <div className="chat-messages">
              {chatHistory.map((msg) => (
                <div
                  key={msg._id}
                  className={`chat-message ${msg.isAdmin ? "admin" : "user"}`}
                >
                  <div className="chat-sender">
                    {msg.isAdmin
                      ? "Admin"
                      : selectedUser.name ||
                        selectedUser.email ||
                        `ID: ${selectedUser}`}
                  </div>
                  <div className="chat-bubble">{msg.content}</div>
                </div>
              ))}
              <div ref={chatRef} />
            </div>
            <div className="chat-input">
              <input
                type="text"
                placeholder="Nhập tin nhắn..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button onClick={handleSend}>Gửi</button>
            </div>
          </>
        ) : (
          <p className="chat-placeholder">
            Chọn một khách hàng để bắt đầu chat.
          </p>
        )}
      </div>
    </div>
  );
};

export default ChatWidget;
