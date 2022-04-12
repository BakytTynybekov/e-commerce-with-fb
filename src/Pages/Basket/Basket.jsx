import React from "react";
import { useContext } from "react";
import { CartContext } from "../../context/GeneralCard";
import * as actions from "../../context/actions";
import "./basket.scss";

function Basket() {
  const { allProductsInCart, dispacher } = useContext(CartContext);
  const handleDelete = (id) => {
    const products = [...allProductsInCart];
    const newProducts = allProductsInCart.filter((item) => item.id !== id);
    dispacher({ type: actions.DELETEFROMCART, payload: newProducts });
  };
  return (
    <div className="basket">
      <h1>Basket</h1>
      <div className="basket__inner-item">
        <h3 className="title">Name</h3>
        <p className="quantity">Quantity</p>
        <p className="price">$Price</p>
        <p>Image</p>
        <p></p>
      </div>
      <div>
        {allProductsInCart.map((product) => (
          <div className="basket__inner-item" key={product.id}>
            <h3 className="title">{product.name}</h3>
            <p className="quantity">{product.qtt}</p>
            <p className="price">${product.qtt * product.price}</p>
            <p>
              {" "}
              <img src={product.image} alt="desc" />
            </p>
            <button onClick={() => handleDelete(product.id)}>X</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Basket;
