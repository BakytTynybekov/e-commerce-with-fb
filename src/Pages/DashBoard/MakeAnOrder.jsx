import { Grid, TextField, Button, List, ListItem } from "@mui/material";
import { useContext, useState } from "react";
import { CartContext } from "../../context/GeneralCard";
import { FirestoreContext } from "../../context/GeneralFirestore";

function MakeAnOrder() {
  const { allProductsInCart } = useContext(CartContext);
  const { saveOrder } = useContext(FirestoreContext);
  const [customerData, setCustomerData] = useState({
    name: "",
    phone: "",
    address: "",
    email: "",
    creditCart: "",
  });

  const handleMakeAnOrder = () => {
    saveOrder(allProductsInCart, customerData);
  };
  return (
    <div>
      <Grid container>
        <Grid item xs={12} md={6}>
          <h1>Add the list of items to button</h1>
          <List>
            {allProductsInCart.map((el) => {
              return (
                <ListItem key={el.id}>
                  {" "}
                  {el.name} {el.qtt}
                </ListItem>
              );
            })}
          </List>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          style={{ display: "grid", padding: "40px 60px", gridGap: "20px" }}
        >
          <TextField
            value={customerData.name}
            variant="outlined"
            label="Your name"
            onChange={(e) =>
              setCustomerData({ ...customerData, name: e.target.value })
            }
          />
          <TextField
            value={customerData.phone}
            variant="outlined"
            label="Your phone"
            type={"number"}
            onChange={(e) =>
              setCustomerData({ ...customerData, phone: e.target.value })
            }
          />
          <TextField
            value={customerData.address}
            variant="outlined"
            label="Your address"
            onChange={(e) =>
              setCustomerData({ ...customerData, address: e.target.value })
            }
          />
          <TextField
            value={customerData.email}
            variant="outlined"
            label="Your email"
            type={"email"}
            onChange={(e) =>
              setCustomerData({ ...customerData, email: e.target.value })
            }
          />
          <TextField
            value={customerData.creditCart}
            variant="outlined"
            label="Credit Cart"
            type={"number"}
            onChange={(e) =>
              setCustomerData({ ...customerData, creditCart: e.target.value })
            }
          />
          <Button variant="contained" onClick={() => handleMakeAnOrder()}>
            Make an order
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default MakeAnOrder;
