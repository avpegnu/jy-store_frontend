import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { handleLoginAccount } from "../../services/auth";
import { setStorageData } from "../../helpers/stored";
import background from "../../assets/background.png";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const getInputClassName = (inputName) =>
    `border-2 md:h-[4rem] h-[3rem] px-4 md:text-lg transition-all rounded-lg outline-none ${
      focusedInput === inputName ? "border-black" : "border-gray-300"
    }`;

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage("Vui lòng nhập đầy đủ thông tin đăng nhập.");
      return;
    }

    setErrorMessage(""); // Xóa thông báo lỗi nếu đã nhập đủ thông tin

    const response = await handleLoginAccount({ email, password });

    if (response.success) {
      setStorageData("user", response.account);

      sessionStorage.setItem("token", response.token);
      const pending = JSON.parse(sessionStorage.getItem("pendingAddToCart"));
      if (pending) {
        const { itemId, size } = pending;
        console.log("Thêm lại sản phẩm sau khi login:", itemId, size);
        sessionStorage.removeItem("pendingAddToCart");
        navigate(`/product/${itemId}`);
        return;
      }
      // navigate("/");
      if (response.account.role === "admin") {
        window.location.href =
          "http://localhost:5174?id=" +
          response.account._id +
          "&name=" +
          response.account.name;
      } else {
        navigate("/");
      }
    } else {
      setErrorMessage(response.message);
    }
    console.log("Đăng nhập với:", { email, password });
  };

  return (
    <>
      <Helmet>
        <title>Đăng nhập</title>
      </Helmet>
      <div className="w-full h-screen flex items-center justify-center">
        <div className="w-full h-full max-w-[1800px] md:p-6 p-3 py-2 flex lg:flex-row flex-col md:justify-between items-center lg:space-x-6">
          <div className="lg:w-1/2 w-full h-full lg:pb-0 pb-4">
            <div className="w-full h-full flex justify-center md:items-center 2xl:px-[5%]">
              <div className="w-full max-w-[40rem] flex flex-col md:space-y-4 space-y-3 justify-start">
                <div>
                  <Link to="/">
                    <img
                      className="w-[10rem] max-h-[5rem] scale-[1.2] overflow-hidden"
                      src="/src/assets/logo-text.png"
                      alt="JYSTORE"
                    />
                  </Link>
                </div>
                <div className="flex flex-col space-y-3">
                  <h1 className="font-bold md:text-4xl text-xl">Đăng nhập</h1>
                  <h2 className="md:text-xl text-sm font-medium opacity-70">
                    Vui lòng điền thông tin để đăng nhập
                  </h2>
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

                <p className="underline cursor-pointer text-[rgb(62,48,111)] md:text-lg font-bold w-full text-right">
                  Quên mật khẩu ?
                </p>

                {errorMessage && (
                  <p className="text-red-500 font-medium">{errorMessage}</p>
                )}

                <button
                  onClick={handleLogin}
                  className="w-full bg-[rgb(21,21,71)] md:py-4 py-2 mt-4 text-white md:text-lg font-bold cursor-pointer"
                >
                  Đăng nhập
                </button>

                <div className="flex flex-row items-center">
                  <div className="flex-grow h-[2px] bg-[rgb(230,230,230)]"></div>
                  <p className="text-center px-2 md:text-lg font-medium opacity-70">
                    hoặc đăng nhập với
                  </p>
                  <div className="flex-grow h-[2px] bg-[rgb(230,230,230)]"></div>
                </div>

                <div className="cursor-pointer border-1 rounded-md flex flex-row items-center justify-center md:h-[3.5rem] h-[3rem] space-x-4">
                  <img
                    className="bg-transparent h-[2rem] w-[2rem]"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png"
                    alt="Google"
                  />
                  <span className="md:text-lg font-medium">
                    Đăng nhập với Google
                  </span>
                </div>

                <p className="w-full text-center md:text-lg font-semibold">
                  Chưa có tài khoản?
                  <span className="cursor-pointer underline ml-2 text-[rgb(21,21,71)]">
                    <Link to="/auth/signup">Đăng ký ngay</Link>
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 w-full h-full lg:pb-0 pb-4">
            <div className="w-full h-full flex justify-center items-center">
              <div className="w-full h-fit relative">
                <div className="w-full h-full flex flex-col justify-center md:max-h-[980px]">
                  <img
                    className="h-fit lg:w-full lg:min-h-[825px] lg:max-h-none md:max-h-[40rem] sm:max-h-[30rem] max-h-[20rem]"
                    src={background}
                    alt="BackgroundImg"
                  />
                  <div className="sm:px-6 px-2 w-full absolute z-10 bottom-0 text-white">
                    <div className="bg-[rgba(0,0,0,0.2)] h-fit w-full sm:px-4 px-2 md:text-xl shadow-xl sm:py-6 py-2">
                      <p className="font-semibold opacity-90 md:text-lg text-sm">
                        &quot;Chào mừng bạn đến với thế giới thời trang của
                        chúng tôi, nơi mà sự đam mê được thể hiện qua từng sản
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
      </div>
    </>
  );
};

export default Login;
