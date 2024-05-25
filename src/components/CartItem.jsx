import { currencyFormatter } from "../util/formatting";
export default function CartItem({
  name,
  price,
  quantity,
  onIncrease,
  onDecrease,
}) {
  return (
    <li className="cart-item">
      {name} - {quantity} x {currencyFormatter.format(price)}
      <p className="cart-item-actions">
        <button onClick={onDecrease}>-</button>
        {quantity}
        <button onClick={onIncrease}>+</button>
      </p>
    </li>
  );
}
