import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { handleRegister } from "../../services/auth";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState("");

  const getInputClassName = (inputName) =>
    `border-2 md:h-[4rem] h-[3rem] px-4 md:text-lg transition-all rounded-lg outline-none ${
      focusedInput === inputName ? "border-black" : "border-gray-300"
    }`;

  const handleSignup = async () => {
    // Kiểm tra các trường có bị bỏ trống không
    if (
      !email.trim() ||
      !password.trim() ||
      !name.trim() ||
      !confirmPassword.trim()
    ) {
      setErrorMessage("Vui lòng nhập đầy đủ thông tin để đăng ký.");
      return;
    } else {
      // Nếu nhập đủ mới kiểm tra mật khẩu
      if (password !== confirmPassword) {
        setErrorMessage("");
        setPasswordMatchError("Mật khẩu xác nhận không khớp.");
      } else {
        setPasswordMatchError("");
        const response = await handleRegister({ name, email, password });
        console.log(response);
        if (response.success) {
          navigate("/auth/login");
          alert("Đăng ký thành công");
          setErrorMessage("");
        } else {
          setErrorMessage(response.data.message);
        }
      }
    }

    console.log("Đăng ký với:", { email, password });
  };

  return (
    <>
      <Helmet>
        <title>Đăng ký</title>
      </Helmet>
      <div className="w-full h-screen flex items-center justify-center">
        <div className="w-full h-full max-w-[1800px] md:p-6 p-3 py-2 flex lg:flex-row flex-col md:justify-between items-center lg:space-x-6">
          <div className="lg:w-1/2 w-full h-full lg:pb-0 pb-4">
            <div className="w-full h-full flex justify-center md:items-center 2xl:px-[5%]">
              <div className="w-full max-w-[40rem] flex flex-col md:space-y-4 space-y-3 justify-start">
                <div>
                  <img
                    className="w-[10rem] max-h-[5rem] scale-[1.2] overflow-hidden"
                    src="/src/assets/logo-text.jpg"
                    alt="JYSTORE"
                  />
                </div>
                <div className="flex flex-col space-y-3">
                  <h1 className="font-bold md:text-4xl text-xl">Đăng ký</h1>
                  <h2 className="md:text-xl text-sm font-medium opacity-70">
                    Vui lòng điền thông tin để tạo tài khoản mới
                  </h2>
                </div>
                <div className="flex flex-col space-y-3">
                  <p className="md:text-xl space-x-2 font-bold">
                    Họ và tên <span className="text-[red]">*</span>
                  </p>
                  <input
                    type="text"
                    placeholder="Nhập họ và tên của bạn"
                    name="fullName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={getInputClassName("fullName")}
                    onFocus={() => setFocusedInput("fullName")}
                    onBlur={() => setFocusedInput(null)}
                  />
                </div>
                <div className="flex flex-col space-y-3">
                  <p className="md:text-xl space-x-2 font-bold">
                    Địa chỉ email <span className="text-[red]">*</span>
                  </p>
                  <input
                    type="text"
                    placeholder="Nhập địa chỉ Email của bạn"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={getInputClassName("email")}
                    onFocus={() => setFocusedInput("email")}
                    onBlur={() => setFocusedInput(null)}
                  />
                </div>

                <div className="flex flex-col space-y-3">
                  <p className="md:text-xl space-x-2 font-bold">
                    Mật khẩu <span className="text-[red]">*</span>
                  </p>
                  <div className="relative w-full">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Nhập mật khẩu"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`w-full ${getInputClassName("password")}`}
                      onFocus={() => setFocusedInput("password")}
                      onBlur={() => setFocusedInput(null)}
                    />
                    <div
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-900 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <FaEyeSlash size={27} />
                      ) : (
                        <FaEye size={25} />
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col space-y-3">
                  <p className="md:text-xl space-x-2 font-bold">
                    Xác nhận mật khẩu <span className="text-[red]">*</span>
                  </p>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Nhập lại mật khẩu"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={getInputClassName("confirmPassword")}
                    onFocus={() => setFocusedInput("confirmPassword")}
                    onBlur={() => setFocusedInput(null)}
                  />
                </div>

                {errorMessage && (
                  <p className="text-red-500 font-medium">{errorMessage}</p>
                )}

                {passwordMatchError && (
                  <p className="text-red-500 font-medium">
                    {passwordMatchError}
                  </p>
                )}

                <button
                  onClick={handleSignup}
                  className="w-full bg-[rgb(21,21,71)] md:py-4 py-2 mt-4 text-white md:text-lg font-bold cursor-pointer"
                >
                  Đăng ký
                </button>
                <p className="w-full text-center md:text-lg font-semibold">
                  Đã có tài khoản?
                  <span className="cursor-pointer underline ml-2 text-[rgb(21,21,71)]">
                    <Link to="/auth/login">Đăng nhập</Link>
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 w-full h-full lg:pb-0 pb-4">
            <div className="w-full h-full flex justify-center items-center">
              <div className="w-full h-fit relative">
                <img
                  className="h-fit lg:w-full lg:min-h-[825px] lg:max-h-none md:max-h-[40rem] sm:max-h-[30rem] max-h-[20rem]"
                  src="https://surl.li/gaytbz"
                  alt="BackgroundImg"
                />
                <div className="sm:px-6 px-2 w-full absolute z-10 bottom-0 text-white">
                  <div className="bg-[rgba(0,0,0,0.2)] h-fit w-full sm:px-4 px-2 md:text-xl shadow-xl sm:py-6 py-2">
                    <p className="font-semibold opacity-90 md:text-lg text-sm">
                      &quot;Chào mừng bạn đến với thế giới thời trang của chúng
                      tôi, nơi mà sự đam mê được thể hiện qua từng sản
                      phẩm.&quot;
                    </p>
                    <p className="mt-4 md:text-2xl text-lg font-bold">
                      Nguyễn Việt Anh
                    </p>
                    <p className="mt-2 md:text-xl text-[15px] font-medium">
                      JYSTORE
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
