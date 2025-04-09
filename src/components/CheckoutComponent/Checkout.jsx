import { useState } from "react";
import arrow_icon from "../../assets/arrow.png";
import { FaAddressCard } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";
import { useContext } from "react";
import { ShopContext } from "../../context/ShopContext";
import { createPaymentRequest } from "../../services/payment";
import { Helmet } from "react-helmet-async";

const provinces = [
  {
    name: "Hà Nội",
    districts: [
      {
        name: "Ba Đình",
        wards: ["Phúc Xá", "Trúc Bạch", "Vĩnh Phúc"],
      },
      {
        name: "Hoàn Kiếm",
        wards: ["Chương Dương", "Cửa Đông", "Hàng Bạc"],
      },
    ],
  },
  {
    name: "TP Hồ Chí Minh",
    districts: [
      {
        name: "Quận 1",
        wards: ["Bến Nghé", "Bến Thành", "Cầu Ông Lãnh"],
      },
      {
        name: "Quận 3",
        wards: ["Phường 1", "Phường 2", "Phường 3"],
      },
    ],
  },
];
const Checkout = () => {
  const { getTotalCartAmount } = useContext(ShopContext);

  const [step, setStep] = useState(1);

  const nextStep = async () => {
    if (step === 1 && !validateForm()) return;
    if (step < 3) {
      setStep(step + 1);
      return;
    }
    const url = await createPaymentRequest();
    window.location.href = url?.data;
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const icons = [FaAddressCard, MdOutlinePayment, GiConfirmed];

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    district: "",
    ward: "",
    address: "",
  });
  const [errors, setErrors] = useState({});
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Họ và tên không được để trống";
    if (!formData.phone) newErrors.phone = "Số điện thoại không được để trống";
    if (!formData.city) {
      newErrors.city = "Vui lòng chọn Tỉnh/Thành phố";
    } else {
      if (!formData.district) {
        newErrors.district = "Vui lòng chọn Quận/Huyện";
      } else {
        if (!formData.ward) newErrors.ward = "Vui lòng chọn Phường/Xã";
      }
    }
    if (!formData.address)
      newErrors.address = "Địa chỉ chi tiết không được để trống";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const selectedProvince = provinces.find((p) => p.name === formData.city);
  const selectedDistrict = selectedProvince?.districts.find(
    (d) => d.name === formData.district
  );

  const [paymentMethod, setPaymentMethod] = useState("");
  return (
    <>
      <Helmet>
        <title>Thanh toán</title>
      </Helmet>
      <section className="w-full flex justify-center items-center py-4">
        <div className="w-full max-w-screen-2xl py-4 lg:px-0 px-2">
          <div className="flex flex-row justify-center items-center w-full min-w-[20rem]">
            {[
              "Thông tin địa chỉ",
              "Phương thức thanh toán",
              "Xác nhận thanh toán",
            ].map((label, index) => {
              const Icon = icons[index];
              return (
                <>
                  <div
                    key={index}
                    className="flex flex-col items-center md:min-w-[216px]"
                  >
                    <div
                      className={`sm:w-[3rem] sm:h-[3rem] w-[2.5rem] h-[2.5rem] rounded-full flex justify-center items-center ${
                        step > index ? "bg-blue-900 opacity-90" : "bg-gray-300"
                      }`}
                    >
                      <Icon className="text-white text-xl" />
                    </div>
                    <span className="mt-2 text-center md:inline hidden text-xl font-medium text-gray-800">
                      {label}
                    </span>
                  </div>
                  <div
                    className={`${
                      index < 2
                        ? "sm:w-1/5 w-1/4 h-1 bg-[rgb(230,230,230)]"
                        : ""
                    }`}
                  ></div>
                </>
              );
            })}
          </div>
          <p className="max-w-screen-2xl text-center lg:text-4xl text-2xl md:mt-12 mt-6 font-bold">
            {step === 1 && "Thông tin địa chỉ"}
            {step === 2 && "Phương thức thanh toán"}
            {step === 3 && "Xác nhận thanh toán"}
          </p>
        </div>
      </section>

      <div className="flex justify-center">
        <div className="max-w-screen-2xl w-full flex flex-col md:px-0 px-2 space-y-3">
          {step === 1 && (
            <>
              {/* Form nhập thông tin địa chỉ */}
              <div className="flex justify-center">
                <div className="max-w-screen-2xl w-full flex flex-col md:px-0 px-2 space-y-3">
                  <div className="flex sm:flex-row flex-col justify-between w-full sm:space-y-0 space-y-3">
                    <div className="sm:w-[45%] w-full">
                      <p className="sm:text-xl font-semibold ">
                        Họ và tên <span className="text-[red] text-2xl">*</span>
                      </p>
                      <input
                        type="text"
                        placeholder="Ví dụ: Nguyễn Việt Anh"
                        className="border-2 w-full sm:text-xl sm:h-[4rem] h-[3rem] border-[rgb(230,230,230)] px-2 my-2"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xl">{errors.name}</p>
                      )}
                    </div>
                    <div className="sm:w-[45%] w-full">
                      <p className="sm:text-xl font-semibold ">
                        Số điện thoại{" "}
                        <span className="text-[red] text-2xl">*</span>
                      </p>
                      <input
                        type="text"
                        placeholder="Ví dụ: 0123456789"
                        className="border-2 w-full sm:text-xl sm:h-[4rem] h-[3rem] border-[rgb(230,230,230)] px-2 my-2"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xl">{errors.phone}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex md:flex-row flex-col justify-between w-full md:space-y-0 space-y-3 md:space-x-4 space-x-0">
                    <div className="md:w-1/3 w-full">
                      <p className="sm:text-xl font-semibold ">
                        Tỉnh/Thành phố{" "}
                        <span className="text-[red] text-2xl">*</span>
                      </p>
                      <select
                        name="city"
                        className="border-2 w-full my-2 sm:text-xl sm:h-[4rem] h-[3rem]
                            border-[rgb(230,230,230)] px-2"
                        value={formData.city}
                        onChange={handleChange}
                      >
                        <option value="">Chọn Tỉnh/Thành phố</option>
                        {provinces.map((province, index) => (
                          <option key={index} value={province.name}>
                            {province.name}
                          </option>
                        ))}
                      </select>
                      {errors.city && (
                        <p className="text-red-500 text-xl">{errors.city}</p>
                      )}
                    </div>
                    <div className="md:w-1/3 w-full">
                      <p className="sm:text-xl font-semibold ">
                        Huyện <span className="text-[red] text-2xl">*</span>
                      </p>
                      <select
                        name="district"
                        className="border-2 w-full my-2 sm:text-xl sm:h-[4rem] h-[3rem]
                            border-[rgb(230,230,230)] px-2"
                        value={formData.district}
                        onChange={handleChange}
                      >
                        <option value="">Chọn Huyện</option>
                        {selectedProvince?.districts.map((district, index) => (
                          <option key={index} value={district.name}>
                            {district.name}
                          </option>
                        ))}
                      </select>
                      {errors.district && (
                        <p className="text-red-500 text-xl">
                          {errors.district}
                        </p>
                      )}
                    </div>
                    <div className="md:w-1/3 w-full">
                      <p className="sm:text-xl font-semibold ">
                        Xã/Phường <span className="text-[red] text-2xl">*</span>
                      </p>
                      <select
                        name="ward"
                        className="border-2 w-full my-2 sm:text-xl sm:h-[4rem] h-[3rem]
                            border-[rgb(230,230,230)] px-2"
                        value={formData.ward}
                        onChange={handleChange}
                      >
                        <option value="">Chọn Xã/Phường</option>
                        {selectedDistrict?.wards.map((ward, index) => (
                          <option key={index} value={ward}>
                            {ward}
                          </option>
                        ))}
                      </select>
                      {errors.ward && (
                        <p className="text-red-500 text-xl">{errors.ward}</p>
                      )}
                    </div>
                  </div>
                  <div className="w-full">
                    <p className="sm:text-xl font-semibold ">
                      Địa chỉ chi tiết{" "}
                      <span className="text-[red] text-2xl">*</span>
                    </p>
                    <input
                      type="text"
                      placeholder="Ví dụ: Xã Trường Yên, Huyện Chương Mỹ, Thành phố Hà Nội"
                      className="border-2 w-full sm:text-xl sm:h-[4rem] h-[3rem] border-[rgb(230,230,230)] px-2 my-2"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                    />
                    {errors.address && (
                      <p className="text-red-500 text-xl">{errors.address}</p>
                    )}
                  </div>
                  <div className="w-full">
                    <p className="sm:text-xl font-semibold ">Ghi chú:</p>
                    <input
                      type="text"
                      placeholder="Lưu ý tại đây"
                      className="border-2 w-full sm:text-xl sm:h-[4rem] h-[3rem] border-[rgb(230,230,230)] px-2 my-2"
                      name="address"
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <p className="text-xl font-semibold">
                Chọn phương thức thanh toán
              </p>
              <div className="flex flex-col space-y-3">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="payment"
                    value="credit_card"
                    checked={paymentMethod === "credit_card"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span>Thẻ tín dụng/Ghi nợ</span>
                </label>

                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="payment"
                    value="bank_transfer"
                    checked={paymentMethod === "bank_transfer"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span>Chuyển khoản ngân hàng</span>
                </label>

                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="payment"
                    value="cash_on_delivery"
                    checked={paymentMethod === "cash_on_delivery"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span>Thanh toán khi nhận hàng</span>
                </label>
              </div>
            </>
          )}

          {step === 3 && (
            <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Xác nhận thanh toán
              </h2>

              <div className="mb-4">
                <p className="text-lg font-medium text-gray-700">
                  Địa chỉ giao hàng:
                </p>
                <p className="text-gray-600">
                  {formData.name} - {formData.phone} <br />
                  {formData.address}, {formData.ward}, {formData.district},{" "}
                  {formData.city}
                </p>
              </div>

              <div className="mb-4">
                <p className="text-lg font-medium text-gray-700">
                  Phương thức thanh toán:
                </p>
                <p className="text-gray-600">{paymentMethod}</p>
              </div>

              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <div className="flex justify-between text-lg font-medium text-gray-700">
                  <span>Tạm tính:</span>
                  <span>${getTotalCartAmount()}</span>
                </div>
                <div className="flex justify-between text-lg font-medium text-gray-700">
                  <span>Phí vận chuyển:</span>
                  <span>Miễn phí</span>
                </div>
                <hr className="my-2 border-gray-300" />
                <div className="flex justify-between text-xl font-semibold text-gray-800">
                  <span>Tổng cộng:</span>
                  <span>${getTotalCartAmount()}</span>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between">
            {step > 1 && (
              <button
                className="bg-[rgb(51,51,51)] md:w-fit mx-auto flex flex-row items-center justify-center
                 text-white md:min-w-[15rem] w-full px-4 sm:py-5 py-3 h-fit sm:text-xl font-bold cursor-pointer ml-0 mr-auto hover:bg-[rgb(34,34,34)]"
                onClick={prevStep}
              >
                Quay lại
              </button>
            )}
            {step < 3 ? (
              <button
                className="bg-[rgb(21,21,71)] md:w-fit mx-auto flex flex-row items-center justify-center
                 text-white md:min-w-[15rem] w-full px-4 sm:py-5 py-3 h-fit sm:text-xl font-bold cursor-pointer ml-auto mr-0 hover:bg-[rgb(22,22,51)]"
                onClick={nextStep}
              >
                Tiếp theo{" "}
                <img src={arrow_icon} alt="-->" className="ml-4 mt-1" />
              </button>
            ) : (
              <button
                className="bg-green-600 md:w-fit mx-auto flex flex-row items-center justify-center
                 text-white md:min-w-[15rem] w-full px-4 sm:py-5 py-3 h-fit sm:text-xl font-bold cursor-pointer ml-auto mr-0 hover:bg-green-700"
                onClick={nextStep}
              >
                Xác nhận và Thanh toán
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
