import "./styles.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import AllProducts from "./Pages/Products/AllProducts";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Basket from "./Pages/Basket/Basket";
import Login from "./Pages/Login";
import DashBoard from "./Pages/DashBoard/DashBoard";
import AddProducts from "./Pages/DashBoard/AddProducts";
import Orders from "./Pages/DashBoard/Orders";
import SeeProducts from "./Pages/DashBoard/SeeProducts";
import MakeAnOrder from "./Pages/DashBoard/MakeAnOrder";

export default function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="products" element={<AllProducts />} />
        <Route path="basket" element={<Basket />} />
        <Route path="make-an-order" element={<MakeAnOrder />} />
        <Route path="login" element={<Login />} />
        <Route path="dashboard" element={<DashBoard />}>
          <Route path="add-products" element={<AddProducts />} />
          <Route path="orders" element={<Orders />} />
          <Route path="see-products" element={<SeeProducts />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}
