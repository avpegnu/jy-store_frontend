import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { changePassword } from "../../services/auth";
import { getStorageData } from "../../helpers/stored";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const user = getStorageData("user", {});

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setErrorMessage("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("Mật khẩu mới không khớp.");
      return;
    }

    const response = await changePassword(
      user._id,
      newPassword,
      currentPassword
    );

    if (response.success) {
      setSuccessMessage("Đổi mật khẩu thành công! Vui lòng đăng nhập lại.");
      setTimeout(() => navigate("/auth/login"), 2000);
    } else {
      setErrorMessage(response.message);
    }
  };

  return (
    <>
      <Helmet>
        <title>Đổi mật khẩu</title>
      </Helmet>
      <div className="w-full pt-30 pb-30 flex items-center justify-center">
        <div className="max-w-lg w-full p-6 bg-white shadow-lg rounded-lg">
          <h1 className="text-2xl font-bold text-center mb-5 text-[rgb(21,21,71)]">
            Đổi mật khẩu
          </h1>
          <div className="space-y-6">
            <div className="flex flex-col gap-3">
              <label className="font-semibold">Mật khẩu hiện tại</label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full border px-4 py-3 rounded-lg"
                  placeholder="Nhập mật khẩu hiện tại"
                />
                <div
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? (
                    <FaEyeSlash size={20} />
                  ) : (
                    <FaEye size={20} />
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <label className="font-semibold ">Mật khẩu mới</label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full border px-4 py-3 rounded-lg"
                  placeholder="Nhập mật khẩu mới"
                />
                <div
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? (
                    <FaEyeSlash size={20} />
                  ) : (
                    <FaEye size={20} />
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <label className="font-semibold">Xác nhận mật khẩu</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border px-4 py-3 rounded-lg"
                  placeholder="Nhập lại mật khẩu mới"
                />
                <div
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash size={20} />
                  ) : (
                    <FaEye size={20} />
                  )}
                </div>
              </div>
            </div>

            {errorMessage && (
              <p className="text-red-500 text-sm">{errorMessage}</p>
            )}
            {successMessage && (
              <p className="text-green-500 text-sm">{successMessage}</p>
            )}

            <button
              onClick={handleChangePassword}
              className="w-full bg-blue-900 text-white py-2 rounded-lg font-semibold hover:bg-blue-950 cursor-pointer transition duration-200 mt-3"
            >
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
