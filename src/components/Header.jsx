import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/GeneralCard";
import { GeneralAuthContext } from "../context/GeneralContext";
import { Button } from "@mui/material";
function Header() {
  const { allProductsInCart } = useContext(CartContext);
  const { user, logOut } = useContext(GeneralAuthContext);
  const amount = allProductsInCart.reduce(
    (acc, item) => item.qtt * item.price + acc,
    0
  );
  return (
    <div>
      <header className="header">
        <div className="logo">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/ITunes_Store_logo.svg/640px-ITunes_Store_logo.svg.png"
            alt=""
            width="350px"
          />
        </div>

        <nav>
          <NavLink className="navLink" to="/">
            Home
          </NavLink>
          <NavLink className="navLink" to="/products">
            Products
          </NavLink>
          <NavLink className="navLink" to="/dashboard">
            DashBoard
          </NavLink>

          <Link to="/basket" style={{ textDecoration: "none" }}>
            <Button sx={{ marginRight: "20px" }} variant="contained">
              ${amount}
            </Button>
          </Link>
          <Link to="/login" style={{ textDecoration: "none" }}>
            {!user ? (
              <Button variant="contained">Login</Button>
            ) : (
              <Button
                variant="contained"
                sx={{ background: "red" }}
                onClick={() => logOut()}
              >
                Logout
              </Button>
            )}
          </Link>
        </nav>
      </header>
    </div>
  );
}

export default Header;
