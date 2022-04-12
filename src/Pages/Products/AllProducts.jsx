import { useContext } from "react";
import { FirestoreContext } from "../../context/GeneralFirestore";
import Product from "./Product";
import "./products.scss";

function AllProducts() {
  const { allProducts } = useContext(FirestoreContext);

  return (
    <div className="products">
      <div className="products__inner">
        {allProducts.map((product) => {
          return (
            <Product key={product.id} id={product.id} data={product.data} />
          );
        })}
      </div>
    </div>
  );
}

export default AllProducts;
