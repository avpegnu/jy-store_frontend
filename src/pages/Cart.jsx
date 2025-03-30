import CartItems from "../components/CartItemsComponent/cartItems";
import { Helmet } from "react-helmet-async";
const Cart = () => {
  return (
    <>
      <Helmet>
        <title>Giỏ hàng</title>
      </Helmet>
      <div>
        <CartItems />
      </div>
    </>
  );
};

export default Cart;
