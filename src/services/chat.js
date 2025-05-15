import axios from "axios";

const chatAPI = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

export const sendMessage = async ({ receiverId, content, isAdmin }) => {
  try {
    // Lấy senderId từ localStorage
    const user = JSON.parse(localStorage.getItem("user"));

    // Kiểm tra nếu user tồn tại và có _id
    if (!user || !user._id) {
      throw new Error("Không tìm thấy senderId trong localStorage");
    }

    const senderId = user._id;
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
