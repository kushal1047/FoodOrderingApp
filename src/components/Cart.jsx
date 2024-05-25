import Modal from "../UI/Modal.jsx";
import { useContext } from "react";
import CartContext from "../store/CartContext";
import Button from "../UI/Button";
import { currencyFormatter } from "../util/formatting";
import UserProgressContext from "../store/UserProgressContext.jsx";
import CartItem from "./CartItem.jsx";
export default function Cart() {
  const userProgressCtx = useContext(UserProgressContext);
  function hideCart() {
    userProgressCtx.hideCart();
  }
  const cartCtx = useContext(CartContext);
  const cartTotal = cartCtx.items.reduce((total, item) => {
    return total + item.quantity * item.price;
  }, 0);
  function handleShowCheckout() {
    userProgressCtx.showCheckout();
  }
  return (
    <Modal
      className="cart"
      open={userProgressCtx.progress === "cart"}
      onClose={userProgressCtx.progress === "cart" ? hideCart : null}
    >
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            price={item.price}
            onDecrease={() => cartCtx.removeItem(item.id)}
            onIncrease={() => cartCtx.addItem(item)}
          />
        ))}
        <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
        <p className="modal-actions">
          <Button textOnly onClick={hideCart}>
            Close
          </Button>
          {cartCtx.items.length > 0 && (
            <Button onClick={handleShowCheckout}>Go to Checkout</Button>
          )}
        </p>
      </ul>
    </Modal>
  );
}
