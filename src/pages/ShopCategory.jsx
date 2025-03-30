import { useContext } from "react";
import "./css/ShopCategory.css";
import { ShopContext } from "../context/ShopContext";
import dropdown_icon from "../assets/dropdown_icon.png";
import Item from "../components/ItemComponent/Item";
import { Helmet } from "react-helmet-async";
const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  return (
    <>
      <Helmet>
        <title>Sản phẩm</title>
      </Helmet>
      <div className="shop-category">
        <img className="shop-category-banner" src={props.banner} alt="banner" />
        <div className="shop-category-indexSort">
          <p>
            <span>Showing 1-12</span> out of 36products
          </p>
          <div className="shop-category-sort">
            Sort by{" "}
            <img
              src={dropdown_icon}
              alt="dropdown_icon"
              style={{ display: "inline" }}
            />
          </div>
        </div>
        <div className="shop-category-products">
          {all_product.map((item, i) => {
            if (props.category === item.category) {
              return (
                <Item
                  key={i}
                  id={item.id}
                  name={item.name}
                  image={item.image}
                  new_price={item.new_price}
                  old_price={item.old_price}
                />
              );
            } else return null;
          })}
        </div>
        <div className="shop-category-more">Explore More</div>
      </div>
    </>
  );
};

export default ShopCategory;
