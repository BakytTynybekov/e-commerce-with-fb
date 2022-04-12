import { createContext, useReducer } from "react";
import * as actions from "./actions";

export const CartContext = createContext([]);

const cartReducer = (state, action) => {
  switch (action.type) {
    case actions.ADDTOCART:
      return action.payload;
    case actions.DELETEFROMCART:
      return action.payload;
    default:
      return state;
  }
};

export const CardProvider = ({ children }) => {
  const [allProductsInCart, dispacher] = useReducer(cartReducer, []);
  const data = {
    allProductsInCart: allProductsInCart,
    dispacher: dispacher,
  };
  return <CartContext.Provider value={data}>{children}</CartContext.Provider>;
};
