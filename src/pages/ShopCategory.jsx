// import { useContext } from "react";
import "./css/ShopCategory.css";
// import { ShopContext } from "../context/ShopContext";
//import dropdown_icon from "../assets/dropdown_icon.png";
import { IoMdSearch } from "react-icons/io";
import Item from "../components/ItemComponent/Item";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { getAllProducts } from "../services/product";
const ShopCategory = (props) => {
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(4);

  const filteredAndSortedProducts = [...products]
    .filter((item) => {
      const matchCategory = props.category === item.category;
      const matchPrice =
        priceFilter === "below-500"
          ? item.new_price < 500
          : priceFilter === "500-1000"
          ? item.new_price >= 500 && item.new_price <= 1000
          : priceFilter === "above-1000"
          ? item.new_price > 1000
          : true;
      const matchSearch = item.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      return matchCategory && matchPrice && matchSearch;
    })
    .sort((a, b) => {
      if (sortOption === "price-asc") return a.new_price - b.new_price;
      if (sortOption === "price-desc") return b.new_price - a.new_price;
      if (sortOption === "name-asc") return a.name.localeCompare(b.name);
      if (sortOption === "name-desc") return b.name.localeCompare(a.name);
      return 0;
    });

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
        {/* <img className="shop-category-banner" src={props.banner} alt="banner" /> */}
        <div
          className="overflow-hidden w-[100%] h-[200px] md:h-[400px] lg:h-[400px] bg-cover bg-center flex items-center justify-between mb-10 text-white m-auto bg-gradient-to-b from-[#5c77b0] to-[#fcfcfc22]"
          style={{ fontFamily: "-moz-initial" }}
        >
          <div className="ml-auto mr-auto text-left flex flex-col items-center justify-center md:ml-60 md:mr-0  ">
            <h2 className="text-4xl md:text-7xl font-bold text-blue-900 text-center">
              GIẢM GIÁ ??%
            </h2>
            <p className="mt-2 text-lg md:text-xl text-black text-center">
              Còn lại
              <span className="text-blue-900"> 5</span> ngày
            </p>
            <div className="flex flex-col items-center justify-center">
              <button className="mt-4 bg-blue-800 text-white px-8 py-4 rounded-full shadow-md hover:bg-blue-900 transition cursor-pointer">
                Khám phá ngay
              </button>
            </div>
          </div>
          <img
            src={props.banner}
            alt="banner"
            className="hidden md:block lg:h-[400px] md:h-[300px] max-w-full"
          />
        </div>

        <div
          className="shop-category-indexSort"
          style={{ fontFamily: "Roboto" }}
        >
          <span>
            Hiển thị{" "}
            <strong>
              {Math.min(visibleCount, filteredAndSortedProducts.length)}
            </strong>{" "}
            sản phẩm
          </span>
          <div className="flex flex-wrap gap-4 items-center mt-2">
            {/* Tìm kiếm */}
            <div className="relative w-[200px]">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border px-3 py-1 pr-9 rounded w-full"
              />
              <IoMdSearch className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>

            {/* Lọc theo giá */}
            <div>
              <label htmlFor="filter">Lọc giá: </label>
              <select
                id="filter"
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="ml-2 border px-2 py-1 rounded"
              >
                <option value="">Tất cả</option>
                <option value="below-500">Dưới 500K</option>
                <option value="500-1000">500K - 1 triệu</option>
                <option value="above-1000">Trên 1 triệu</option>
              </select>
            </div>

            {/* Sắp xếp */}
            <div>
              <label htmlFor="sort">Sắp xếp: </label>
              <select
                id="sort"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="ml-2 border px-2 py-1 rounded"
              >
                <option value="">Mặc định</option>
                <option value="price-asc">Giá tăng dần</option>
                <option value="price-desc">Giá giảm dần</option>
                <option value="name-asc">Tên A-Z</option>
                <option value="name-desc">Tên Z-A</option>
              </select>
            </div>
          </div>
        </div>

        <div className="shop-category-products">
          {filteredAndSortedProducts.slice(0, visibleCount).map((item, i) => (
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

        {visibleCount < filteredAndSortedProducts.length && (
          <div
            className="shop-category-more"
            onClick={() => setVisibleCount((prev) => prev + 4)}
            style={{ fontFamily: "Roboto" }}
          >
            Hiển thị thêm
          </div>
        )}
      </div>
    </>
  );
};

export default ShopCategory;
