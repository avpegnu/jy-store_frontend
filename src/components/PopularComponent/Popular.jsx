import "./Popular.css";
import { useEffect, useState } from "react";
import { getAllProducts } from "../../services/product";
import Item from "../ItemComponent/Item";
const Popular = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllProducts();
      setProducts(data);
    };
    fetchData();
  }, []);
  console.log(products);
  return (
    <div className="popular" style={{ fontFamily: "Roboto" }}>
      <h1>PHỔ BIẾN CHO NỮ</h1>
      <hr />
      <div className="popular-item">
        {products.slice(0, 4).map((item, i) => {
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
        })}
      </div>
    </div>
  );
};

export default Popular;
