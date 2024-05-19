import { useContext, useReducer } from "react";
const CartContext = useContext({
  items: [],
  addItems: () => {},
  removeItems: () => {},
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
  }
}
export function CartContextProvider({ children }) {
  useReducer(cartReducer, { items: [] });
  return <CartContext.Provider>{children}</CartContext.Provider>;
}
export default CartContext;
