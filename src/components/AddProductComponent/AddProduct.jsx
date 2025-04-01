import "./AddProduct.css";
import upload_area from "../../assets/upload_area.svg";
import { useState } from "react";
function AddProduct() {
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    old_price: "",
    new_price: "",
    category: "women",
  });
  const imageHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (image) {
        URL.revokeObjectURL(image);
      }
    }
    setImage(URL.createObjectURL(file));
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const addProduct = async () => {
    console.log(productDetails);
    let responseData;
    let product = productDetails;
    let formData = new FormData();
    formData.append("product", image);

    await fetch("http://localhost:8080/upload", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    })
      .then((resp) => resp.json())
      .then((data) => {
        responseData = data;
      });

    if (responseData.success) {
      {
        product.image = responseData.img_url;
        console.log(product);
        await fetch("http://localhost:8080/addproduct", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        })
          .then((resp) => resp.json())
          .then((data) => {
            data.success
              ? alert("Thêm sản phẩm thành công")
              : alert("Thêm sản phẩm không thành công");
          });
      }
    }
  };

  return (
    <div className="add-product">
      <div className="add-product-item-field">
        <p>Sản phẩm</p>
        <input
          value={productDetails.name}
          onChange={changeHandler}
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
            onChange={changeHandler}
            type="text"
            name="old_price"
            placeholder="Nhập giá gốc"
          />
        </div>
        <div className="add-product-item-field">
          <p>Giá bán</p>
          <input
            value={productDetails.new_price}
            onChange={changeHandler}
            type="text"
            name="new_price"
            placeholder="Nhập giá bán"
          />
        </div>
      </div>
      <div className="add-product-item-field">
        <p>Loại sản phẩm</p>
        <select
          value={productDetails.category}
          onChange={changeHandler}
          name="category"
          className="add-product-selector"
        >
          <option value="men">Nam</option>
          <option value="women">Nữ</option>
          <option value="kid">Trẻ em</option>
        </select>
      </div>
      <div className="add-product-item-field">
        <label htmlFor="file-input">
          <img
            src={image ? image : upload_area}
            className="add-product-thumbnail-img"
            alt="Product Thumbnail"
          />
        </label>
        <input
          onChange={imageHandler}
          type="file"
          name="image"
          id="file-input"
          hidden
        />
      </div>
      <button
        onClick={() => {
          addProduct();
        }}
        className="add-product-btn"
      >
        Thêm
      </button>
    </div>
  );
}

export default AddProduct;
