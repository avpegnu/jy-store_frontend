import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { useParams } from "react-router-dom";
import Breadcrum from "../components/BreadcrumsComponent/breadcrum";
import ProductDisplay from "../components/ProductDisplay/ProductDisplay";
import DescriptionBox from "../components/DescriptionBoxComponent/descriptionBox";
import RelatedProducts from "../components/RelatedProductsComponent/relatedProducts";
import { Helmet } from "react-helmet-async";
const Product = () => {
  const { all_product } = useContext(ShopContext);
  const { productId } = useParams();
  const product = all_product.find((e) => e.id === Number(productId));
  return (
    <>
      <Helmet>
          <title>Thông tin sản phẩm</title>
        </Helmet>
      <div>
        <Breadcrum product={product} />
        <ProductDisplay product={product} />
        <DescriptionBox />
        <RelatedProducts />
      </div>
    </>
  );
};

export default Product;
