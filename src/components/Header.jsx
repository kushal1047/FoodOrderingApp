import { useContext } from "react";
import logoImg from "../assets/logo.jpg";
import Button from "../UI/Button";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
export default function Header() {
  const userProgressCtx = useContext(UserProgressContext);
  const cartCtx = useContext(CartContext);
  const totalCartItems = cartCtx.items.reduce((total, item) => {
    return total + item.quantity;
  }, 0);
  function handleShowCart() {
    userProgressCtx.showCart();
  }
  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="restaurant logo" />
        <h1>MAMMA MIA</h1>
      </div>
      <nav>
        <Button textOnly onClick={handleShowCart}>
          Cart({totalCartItems})
        </Button>
      </nav>
    </header>
  );
}
