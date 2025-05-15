import { useEffect, useState, useRef } from "react";
import { getChatHistory, sendMessage } from "../../services/chat";
import { io } from "socket.io-client";

const socket = io("http://localhost:8080");

const ChatWidget = ({ userId, isAdmin = false }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const chatRef = useRef(null);

  useEffect(() => {
    if (userId) {
      fetchChat();
      socket.emit("join", userId);
      socket.on("newMessage", (newMsg) => {
        setChat((prev) => [...prev, newMsg]);
      });
    }

    return () => {
      socket.off("newMessage");
    };
  }, [userId]);

  const fetchChat = async () => {
    try {
      const res = await getChatHistory(userId);
      setChat(res);
    } catch (err) {
      console.error("Không lấy được lịch sử chat:", err);
    }
  };

  const ADMIN_ID = "6804c33032d8d3c161c45271";

  const handleSend = async () => {
    if (!message.trim()) return;

    const receiverId = isAdmin ? chat[0]?.senderId || userId : ADMIN_ID;
    const newMsg = {
      senderId: userId,
      receiverId,
      content: message,
      isAdmin,
    };

    try {
      const res = await sendMessage(newMsg);
      setChat((prev) => [...prev, res]);
      setMessage("");
    } catch (err) {
      console.error("Lỗi gửi tin nhắn:", err);
    }
  };

  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="bg-blue-900 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-700 transition"
      >
        {open ? "Đóng chat" : "💬 Chat với Admin"}
      </button>

      {open && (
        <div className="w-80 h-96 bg-white shadow-xl rounded-xl flex flex-col mt-3 border border-gray-200">
          {/* Header */}
          <div className="bg-blue-900 text-white px-4 py-2 rounded-t-xl flex justify-between items-center">
            <span className="font-semibold">Hỗ trợ trực tuyến</span>
            <button
              onClick={() => setOpen(false)}
              className="text-sm hover:opacity-80"
            >
              ✕
            </button>
          </div>

          {/* Chat content */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2">
            {chat.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.senderId === userId ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] px-3 py-2 rounded-lg text-sm ${
                    msg.senderId === userId
                      ? "bg-green-100 text-right"
                      : "bg-gray-100 text-left"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            <div ref={chatRef} />
          </div>

          {/* Input */}
          <div className="p-2 border-t flex items-center gap-2">
            <input
              className="flex-1 border rounded-full px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Nhập tin nhắn..."
            />
            <button
              onClick={handleSend}
              className="bg-blue-900 text-white px-3 py-1 rounded-full hover:bg-blue-700 transition text-sm"
            >
              Gửi
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
