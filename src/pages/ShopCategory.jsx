// import { useContext } from "react";
import "./css/ShopCategory.css";
// import { ShopContext } from "../context/ShopContext";
import dropdown_icon from "../assets/dropdown_icon.png";
import Item from "../components/ItemComponent/Item";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { getAllProducts } from "../services/product";
const ShopCategory = (props) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllProducts();
      setProducts(data);
    };
    fetchData();
  }, []);
  return (
    <>
      <Helmet>
        <title>Sản phẩm</title>
      </Helmet>
      <div className="shop-category">
        <img className="shop-category-banner" src={props.banner} alt="banner" />
        <div
          className="shop-category-indexSort"
          style={{ fontFamily: "Roboto" }}
        >
          <p>
            <span>Hiển thị 1-12</span> trong tổng số 36 sản phẩm
          </p>
          <div className="shop-category-sort">
            Sắp xếp theo{" "}
            <img
              src={dropdown_icon}
              alt="dropdown_icon"
              style={{ display: "inline" }}
            />
          </div>
        </div>
        <div className="shop-category-products">
          {products.map((item, i) => {
            if (props.category === item.category) {
              return (
                <Item
                  key={i}
                  id={item._id}
                  name={item.name}
                  image={item.image}
                  new_price={item.new_price}
                  old_price={item.old_price}
                />
              );
            } else return null;
          })}
        </div>
        <div className="shop-category-more" style={{ fontFamily: "Roboto" }}>
          Hiển thị thêm
        </div>
      </div>
    </>
  );
};

export default ShopCategory;
