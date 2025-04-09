import "./RelatedProducts.css";
import { useEffect, useState } from "react";
import { getAllProducts } from "../../services/product";
import Item from "../ItemComponent/Item";

const RelatedProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllProducts();
      setProducts(data);
    };
    fetchData();
  }, []);
  return (
    <div className="related-products">
      <h1>Sản Phẩm Liên Quan</h1>
      <hr />
      <div className="related-products-item">
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

export default RelatedProducts;
