// import { useContext } from "react";
// import { ShopContext } from "../context/ShopContext";
import { useParams } from "react-router-dom";
import Breadcrum from "../components/BreadcrumsComponent/breadcrum";
import ProductDisplay from "../components/ProductDisplay/ProductDisplay";
import DescriptionBox from "../components/DescriptionBoxComponent/descriptionBox";
import RelatedProducts from "../components/RelatedProductsComponent/relatedProducts";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { getProductById } from "../services/product";
const Product = () => {
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState(null);

  useEffect(() => {
    console.log(id);
    const fetchProductDetails = async () => {
      try {
        const data = await getProductById(id);
        setProductDetails(data); // Lưu thông tin sản phẩm vào state
      } catch (error) {
        console.error("Lỗi khi lấy thông tin sản phẩm:", error);
      }
    };

    fetchProductDetails();
  }, [id]);

  // const { all_product } = useContext(ShopContext);
  // const { productId } = useParams();
  // const product = all_product.find((e) => e.id === Number(productId));
  return (
    <>
      <Helmet>
        <title>Thông tin sản phẩm</title>
      </Helmet>
      <div>
        <Breadcrum product={productDetails} />
        <ProductDisplay product={productDetails} />
        <DescriptionBox />
        <RelatedProducts />
      </div>
    </>
  );
};

export default Product;
