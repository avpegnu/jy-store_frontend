import "./NewCollections.css";
import Item from "../ItemComponent/Item";
import { useEffect, useState } from "react";
import { getAllProducts } from "../../services/product";

const NewCollections = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllProducts();
      setProducts(data);
    };
    fetchData();
  }, []);

  return (
    <div className="new-collections" style={{ fontFamily: "Roboto" }}>
      <h1>BỘ SƯU TẬP MỚI</h1>
      <hr />
      <div className="collections">
        {products.slice(5, 9).map((item, i) => (
          <Item
            key={i}
            id={item._id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
    </div>
  );
};

export default NewCollections;
