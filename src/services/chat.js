import axios from "axios";

const chatAPI = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

export const sendMessage = async ({ receiverId, content, isAdmin }) => {
  try {
    const senderId = localStorage.getItem("userId");
    console.log("Sender ID:", senderId);

    const res = await chatAPI.post("/chat/send", {
      senderId,
      receiverId,
      content,
      isAdmin,
    });

    return res.data;
  } catch (error) {
    console.error(
      "Lỗi khi gửi tin nhắn:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getChatHistory = async (userId) => {
  try {
    const res = await chatAPI.get(`/chat/${userId}`);
    return res.data;
  } catch (error) {
    console.error(
      "Lỗi khi lấy lịch sử chat:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getAllChatUsers = async () => {
  try {
    const res = await chatAPI.get("/chatbox/users");
    return res.data;
  } catch (error) {
    console.error(
      "Lỗi khi lấy danh sách người đã nhắn tin:",
      error.response?.data || error.message
    );
    throw error;
  }
};
