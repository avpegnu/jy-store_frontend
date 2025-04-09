import "./AddProduct.css";
import upload_area from "../../assets/upload_area.svg";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function AddProduct() {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const location = useLocation();
  const { productToUpdate } = location.state || {};

  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    old_price: "",
    new_price: "",
    category: "women",
    size: [],
    description: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (productToUpdate) {
      // Nếu có dữ liệu sản phẩm để cập nhật, gán vào state
      setProductDetails({
        name: productToUpdate.name,
        image: productToUpdate.image,
        old_price: productToUpdate.old_price,
        new_price: productToUpdate.new_price,
        category: productToUpdate.category,
        size: productToUpdate.size,
        description: productToUpdate.description,
      });
      setImagePreview(productToUpdate.image); // Hiển thị ảnh sản phẩm cũ
    }
  }, [productToUpdate]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    const { name, value, selectedOptions } = e.target;

    if (name === "size") {
      const selectedSizes = Array.from(
        selectedOptions,
        (option) => option.value
      );
      setProductDetails({
        ...productDetails,
        [name]: selectedSizes, // Lưu vào mảng size
      });
    } else {
      setProductDetails({ ...productDetails, [name]: value });
    }
  };

  const handleSizeChange = (e) => {
    const { value, checked } = e.target;

    setProductDetails((prevDetails) => {
      const updatedSize = checked
        ? [...prevDetails.size, value] // Thêm kích thước nếu chọn
        : prevDetails.size.filter((size) => size !== value); // Xóa kích thước nếu bỏ chọn

      return { ...prevDetails, size: updatedSize };
    });
  };

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const res = await fetch("http://localhost:8080/upload", {
        method: "POST",
        body: formData,
      });
      return await res.json();
    } catch (err) {
      console.error("Lỗi upload ảnh:", err);
      return { success: false };
    }
  };

  const addOrUpdateProduct = async () => {
    if (!imageFile && !productDetails.image) {
      alert("Vui lòng chọn ảnh!");
      return;
    }

    const uploadResult = imageFile
      ? await uploadImage()
      : { success: true, url: productDetails.image };

    if (uploadResult.success) {
      const product = {
        ...productDetails,
        image: uploadResult.url,
      };

      const method = productToUpdate ? "PUT" : "POST";
      const url = productToUpdate
        ? `http://localhost:8080/updateproduct/${productToUpdate._id}`
        : "http://localhost:8080/addproduct";

      try {
        const res = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        });

        const data = await res.json();
        if (data.success) {
          alert(
            `${productToUpdate ? "Cập nhật" : "Thêm"} sản phẩm thành công!`
          );
          navigate(productToUpdate ? "/listproduct" : "/addproduct"); // Điều hướng về trang danh sách sản phẩm
        } else {
          alert(
            `${
              productToUpdate ? "Cập nhật" : "Thêm"
            } sản phẩm không thành công.`
          );
        }
      } catch (err) {
        console.error("Lỗi khi xử lý sản phẩm:", err);
        alert("Có lỗi xảy ra.");
      }
    } else {
      alert("Upload ảnh thất bại.");
    }
  };

  return (
    <div className="add-product">
      <div className="add-product-item-field">
        <p>Tên sản phẩm</p>
        <input
          value={productDetails.name}
          onChange={handleChange}
          type="text"
          name="name"
          placeholder="Nhập tên sản phẩm"
        />
      </div>

      <div className="add-product-price">
        <div className="add-product-item-field">
          <p>Giá gốc</p>
          <input
            value={productDetails.old_price}
            onChange={handleChange}
            type="text"
            name="old_price"
            placeholder="Nhập giá gốc"
          />
        </div>
        <div className="add-product-item-field">
          <p>Giá bán</p>
          <input
            value={productDetails.new_price}
            onChange={handleChange}
            type="text"
            name="new_price"
            placeholder="Nhập giá bán"
          />
        </div>
      </div>

      <div className="add-product-item-field">
        <p>Kích thước</p>
        <div className="size-options">
          <label>
            <input
              type="checkbox"
              value="S"
              onChange={handleSizeChange}
              checked={productDetails.size.includes("S")}
            />
            S
          </label>
          <label>
            <input
              type="checkbox"
              value="M"
              onChange={handleSizeChange}
              checked={productDetails.size.includes("M")}
            />
            M
          </label>
          <label>
            <input
              type="checkbox"
              value="L"
              onChange={handleSizeChange}
              checked={productDetails.size.includes("L")}
            />
            L
          </label>
          <label>
            <input
              type="checkbox"
              value="XL"
              onChange={handleSizeChange}
              checked={productDetails.size.includes("XL")}
            />
            XL
          </label>
          <label>
            <input
              type="checkbox"
              value="XXL"
              onChange={handleSizeChange}
              checked={productDetails.size.includes("XXL")}
            />
            XXL
          </label>
        </div>
      </div>

      <div className="add-product-item-field">
        <p>Loại sản phẩm</p>
        <select
          value={productDetails.category}
          onChange={handleChange}
          name="category"
          className="add-product-selector"
        >
          <option value="men">Nam</option>
          <option value="women">Nữ</option>
          <option value="kid">Trẻ em</option>
        </select>
      </div>
      <div className="add-product-item-field">
        <p>Mô tả sản phẩm</p>
        <textarea
          value={productDetails.description}
          onChange={handleChange}
          name="description"
          placeholder="Nhập mô tả sản phẩm"
          rows="4" // Điều chỉnh chiều cao của textarea nếu cần
        />
      </div>

      <div className="add-product-item-field">
        <label htmlFor="file-input">
          <img
            src={imagePreview || upload_area}
            className="add-product-thumbnail-img"
            alt="Thumbnail"
          />
        </label>
        <input
          onChange={handleFileChange}
          type="file"
          name="image"
          id="file-input"
          hidden
          accept="image/*"
        />
      </div>

      <button onClick={addOrUpdateProduct} className="add-product-btn">
        {productToUpdate ? "Cập nhật" : "Thêm"}
      </button>
    </div>
  );
}

export default AddProduct;
