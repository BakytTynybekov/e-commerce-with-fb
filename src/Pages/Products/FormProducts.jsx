import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { FirestoreContext } from "../../context/GeneralFirestore";
import { TextField, Button, FormControl, Grid } from "@mui/material";

function FormProducts() {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
  });
  const [newImage, setNewImage] = useState("");
  const { addProduct } = useContext(FirestoreContext);
  return (
    <div>
      <h2>Add one more product</h2>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Name"
            variant="outlined"
            placeholder="Product name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Price"
            variant="outlined"
            placeholder="Product price"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            type="file"
            onChange={(e) => setNewImage(e.target.files[0])}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            onClick={() => addProduct(newProduct, newImage)}
          >
            Add Product
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default FormProducts;
