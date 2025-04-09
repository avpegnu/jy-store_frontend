import { createContext, useState, useEffect, useRef } from "react";
import { getAllProducts } from "../services/product"; // Đảm bảo đường dẫn đúng

export const ShopContext = createContext(null);

// const getDefaultCart = (allProduct) => {
//   let cart = {};
//   for (let i = 0; i < allProduct.length; i++) {
//     cart[allProduct[i]._id] = 0; // Dùng _id (ObjectId) của sản phẩm
//   }
//   return cart;
// };

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [allProduct, setAllProduct] = useState([]); // Lưu trữ tất cả sản phẩm từ API
  const [selectedItems, setSelectedItems] = useState([]);
  const isInitialized = useRef(false);

  const toggleSelectItem = (key) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(key)
        ? prevSelected.filter((itemKey) => itemKey !== key)
        : [...prevSelected, key]
    );
  };

  // useEffect(() => {
  //   if (selectedItems.length === 0) {
  //     setSelectedItems(Object.keys(cartItems));
  //   }
  // }, [cartItems]);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const products = await getAllProducts(); // Lấy sản phẩm từ backend
  //       setAllProduct(products); // Lưu vào trạng thái allProduct
  //       setCartItems(getDefaultCart(products)); // Thiết lập cartItems dựa trên allProduct
  //     } catch (error) {
  //       console.error("Lỗi khi lấy sản phẩm:", error);
  //     }
  //   };
  //   fetchProducts();
  // }, []);

  useEffect(() => {
    const syncCartWithUser = () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user && user._id) {
        const storedCart = localStorage.getItem(`cartItems_${user._id}`);
        const storedSelected = localStorage.getItem(
          `selectedItems_${user._id}`
        );
        setCartItems(storedCart ? JSON.parse(storedCart) : {});
        setSelectedItems(storedSelected ? JSON.parse(storedSelected) : []);
      } else {
        setCartItems({});
        setSelectedItems([]);
      }
    };

    const handleStorageChange = () => {
      syncCartWithUser();
    };

    window.addEventListener("storage", handleStorageChange);
    syncCartWithUser(); // chạy lần đầu

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getAllProducts();
        setAllProduct(products);

        const user = JSON.parse(localStorage.getItem("user"));
        if (user && user._id) {
          const storedCart = localStorage.getItem(`cartItems_${user._id}`);
          const storedSelected = localStorage.getItem(
            `selectedItems_${user._id}`
          );
          setCartItems(storedCart ? JSON.parse(storedCart) : {});
          setSelectedItems(storedSelected ? JSON.parse(storedSelected) : []);
        } else {
          setCartItems({});
          setSelectedItems([]);
        }

        isInitialized.current = true;
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (isInitialized.current) {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user && user._id) {
        localStorage.setItem(
          `cartItems_${user._id}`,
          JSON.stringify(cartItems)
        );
      }
    }
  }, [cartItems]);

  useEffect(() => {
    if (isInitialized.current) {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user && user._id) {
        localStorage.setItem(
          `selectedItems_${user._id}`,
          JSON.stringify(selectedItems)
        );
      }
    }
  }, [selectedItems]);

  useEffect(() => {
    console.log("🧺 [INIT] Giỏ hàng đang load:", cartItems);
  }, []);

  // const addToCart = (itemId) => {
  //   setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  //   console.log(cartItems);
  // };
  const addToCart = (itemId, size) => {
    const key = `${itemId}_${size}`;
    setCartItems((prev) => ({
      ...prev,
      [key]: (prev[key] || 0) + 1,
    }));
  };

  // const removeFromCart = (itemId) => {
  //   setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  // };
  const removeFromCart = (itemId, size) => {
    const key = `${itemId}_${size}`;
    setCartItems((prev) => {
      const updated = { ...prev };
      delete updated[key]; // Xóa hẳn sản phẩm khỏi giỏ
      return updated;
    });

    setSelectedItems((prevSelected) =>
      prevSelected.filter((selectedKey) => selectedKey !== key)
    );
  };

  // const getTotalCartAmount = () => {
  //   let totalAmount = 0;
  //   for (const item in cartItems) {
  //     if (cartItems[item] > 0) {
  //       let itemInfo = allProduct.find(
  //         (product) => product._id === item // So sánh _id dạng chuỗi
  //       );
  //       if (itemInfo) {
  //         totalAmount += itemInfo.new_price * cartItems[item];
  //       }
  //     }
  //   }
  //   return totalAmount;
  // };
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const key in cartItems) {
      const [productId] = key.split("_");
      const quantity = cartItems[key];
      const itemInfo = allProduct.find((p) => p._id === productId);
      if (itemInfo) {
        const price = parseInt(itemInfo.new_price.replace(/\./g, ""), 10);
        totalAmount += price * quantity;
      }
    }
    return totalAmount;
  };

  const getSelectedTotalAmount = () => {
    let total = 0;
    for (const key of selectedItems) {
      const [productId] = key.split("_");
      const quantity = cartItems[key];
      const product = allProduct.find((p) => p._id === productId);
      if (product && quantity > 0) {
        const price = parseInt(product.new_price.replace(/\./g, ""), 10);
        total += price * quantity;
      }
    }
    return total;
  };

  const getTotalCartItems = () => {
    let totalItems = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItems += cartItems[item];
      }
    }
    return totalItems;
  };

  const increaseCartQuantity = (itemId, size) => {
    const key = `${itemId}_${size}`;
    setCartItems((prev) => ({
      ...prev,
      [key]: (prev[key] || 0) + 1,
    }));
  };

  const decreaseCartQuantity = (itemId, size) => {
    const key = `${itemId}_${size}`;
    setCartItems((prev) => ({
      ...prev,
      [key]: Math.max((prev[key] || 1) - 1, 0),
    }));
  };

  const resetCart = () => {
    setCartItems({});
    setSelectedItems([]);
  };

  const loadCartFromStorage = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user._id) {
      const storedCart = localStorage.getItem(`cartItems_${user._id}`);
      const storedSelected = localStorage.getItem(`selectedItems_${user._id}`);
      setCartItems(storedCart ? JSON.parse(storedCart) : {});
      setSelectedItems(storedSelected ? JSON.parse(storedSelected) : []);
    } else {
      setCartItems({});
      setSelectedItems([]);
    }
  };

  const contextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    allProduct,
    cartItems,
    addToCart,
    removeFromCart,
    increaseCartQuantity,
    decreaseCartQuantity,
    selectedItems,
    toggleSelectItem,
    getSelectedTotalAmount,
    resetCart,
    loadCartFromStorage,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
