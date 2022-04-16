import React, { useContext } from "react";
import FormProducts from "../Products/FormProducts";
import { GeneralAuthContext } from "../../context/GeneralContext";
import { Navigate, Link, Outlet } from "react-router-dom";
import { Divider, Grid, List, ListItem, ListItemButton } from "@mui/material";
function DashBoard() {
  const { user } = useContext(GeneralAuthContext);
  return (
    <div>
      {user ? (
        <>
          <Grid container spacing={2}>
            <Grid item xs={2} md={2}>
              <List>
                <ListItemButton>
                  <Link to="add-products">Add Products</Link>
                  <Divider />
                </ListItemButton>
                <ListItemButton>
                  <Link to="see-products">See Products</Link>
                  <Divider />
                </ListItemButton>
                <ListItemButton>
                  <Link to="orders">Orders</Link>
                  <Divider />
                </ListItemButton>
              </List>
            </Grid>
            <Grid item xs={10}>
              <Outlet />
            </Grid>
          </Grid>
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  );
}

export default DashBoard;
