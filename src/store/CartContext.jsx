import { createContext, useReducer } from "react";
const CartContext = createContext({
  items: [],
  addItem: () => {},
  removeItem: () => {},
});
function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const currentItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const updatedItems = [...state.items];
    if (currentItemIndex > -1) {
      const existingItem = state.items[currentItemIndex];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      updatedItems[currentItemIndex] = updatedItem;
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }
    return { ...state, items: updatedItems };
  }
  if (action.type === "REMOVE_ITEM") {
    const currentItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const updatedItems = [...state.items];
    const existingItem = state.items[currentItemIndex];
    if (existingItem.quantity === 1) {
      updatedItems.splice(currentItemIndex, 1);
    } else {
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity - 1,
      };
      updatedItems[currentItemIndex] = updatedItem;
    }
    return { ...state, items: updatedItems };
  }
  return state;
}
export function CartContextProvider({ children }) {
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });
  function addItem(item) {
    dispatchCartAction({ type: "ADD_ITEM", item });
  }
  function removeItem(id) {
    dispatchCartAction({ type: "REMOVE_ITEM", id });
  }
  const cartContext = {
    items: cart.items,
    addItem: addItem,
    removeItem: removeItem,
  };
  console.log(cartContext);

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}
export default CartContext;
