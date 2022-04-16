import { Grid } from "@mui/material";
import { useContext, useEffect } from "react";
import { FirestoreContext } from "../../context/GeneralFirestore";

function Orders() {
  const { getAllOrders, allOrders } = useContext(FirestoreContext);

  useEffect(() => {
    getAllOrders();
  }, []);
  return (
    <div>
      <h1>Order</h1>
      <Grid container>
        <Grid item xs={2}>
          Order Id
        </Grid>
        <Grid item xs={2}>
          Name
        </Grid>
        <Grid item xs={2}>
          Address
        </Grid>
        <Grid item xs={2}>
          Description
        </Grid>
        <Grid item xs={2}>
          Status
        </Grid>
        <Grid item xs={2}>
          Delete
        </Grid>

        {allOrders.map(({ data, id }) => {
          return (
            <Grid container spacing={2}>
              <Grid item xs={2}>
                {id}
              </Grid>
              <Grid item xs={2}>
                {data.name}
              </Grid>
              <Grid item xs={2}>
                {data.address}
              </Grid>
              <Grid item xs={2}>
                Description
              </Grid>
              <Grid item xs={2}>
                Status
              </Grid>
              <Grid item xs={2}>
                Delete
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

export default Orders;
