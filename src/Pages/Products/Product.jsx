import React from "react";
import { useState, useContext } from "react";
import { CartContext } from "../../context/GeneralCard";
import * as actions from "../../context/actions";
function Product({ data, id }) {
  const [qtt, setQtt] = useState(0);
  const { dispacher, allProductsInCart } = useContext(CartContext);

  const handlerAddToCard = () => {
    const newProductsList = [...allProductsInCart];
    let a = newProductsList.filter((item) => item.id === id).length;
    if (a > 0) {
      const changedProductedList = newProductsList.map((item) => {
        if (item.id === id) {
          let moreQtt = item.qtt;
          return { ...item, qtt: qtt + moreQtt };
        } else {
          return item;
        }
      });
      console.log(newProductsList);
      dispacher({ type: actions.ADDTOCART, payload: changedProductedList });
    } else {
      const finalProductList = [
        ...allProductsInCart,
        { id: id, qtt: qtt, ...data },
      ];
      dispacher({
        type: actions.ADDTOCART,
        payload: finalProductList,
      });
    }
  };
  return (
    <div key={id} id={id} className="products__inner-item">
      <h3>{data.name}</h3>
      <img src={data.image} width="300px" />
      <p>${data.price}</p>
      <div>
        <button onClick={() => setQtt((prev) => prev + 1)}>+</button>
        <span>{qtt}</span>
        <button onClick={() => setQtt((prev) => prev - 1)}>-</button>
        <button onClick={() => handlerAddToCard()}>Add to Card</button>
      </div>
    </div>
  );
}

export default Product;
