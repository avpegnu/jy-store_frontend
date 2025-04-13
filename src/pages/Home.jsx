import Hero from "../components/HeroComponent/Hero";
import Popular from "../components/PopularComponent/Popular";
import Offers from "../components/OffersComponent/Offers";
import NewCollections from "../components/NewCollectionsComponent/NewCollections";
import NewsLetter from "../components/NewsLetterComponent/newsLetter";
import { Helmet } from "react-helmet-async";

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { updateOrderStatus } from "../services/order";
const Home = () => {
  const location = useLocation();
  console.log(location.search);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const txnRef = queryParams.get("vnp_TxnRef"); // chính là orderId bạn gửi đi lúc thanh toán
    const vnpResponseCode = queryParams.get("vnp_ResponseCode");

    if (txnRef && vnpResponseCode === "00") {
      updateOrderStatus(txnRef, "paid")
        .then(() => {
          console.log(" Cập nhật trạng thái đơn hàng thành công.");
        })
        .catch((err) => {
          console.error(" Lỗi cập nhật trạng thái đơn hàng:", err);
        });
    }
  }, [location.search]);

  return (
    <>
      <Helmet>
        <title>JYStore</title>
      </Helmet>
      <>
        <Hero />
        <Popular />
        <Offers />
        <NewCollections />
        <NewsLetter />
      </>
    </>
  );
};

export default Home;
