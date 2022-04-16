import {
  Button,
  Grid,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Divider,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { FirestoreContext } from "../../context/GeneralFirestore";

function SeeProducts() {
  const { allProducts, deleteProduct, modifyProduct } =
    useContext(FirestoreContext);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dataToChange, setDataToChange] = useState({});
  const handleDelete = (id, img) => {
    console.log(img);
    img = [...img];
    const start = img.indexOf("%");
    const end = img.indexOf("?");
    img = img.slice(start + 3, end).join("");
    deleteProduct(id, img);
  };

  const handleModify = (data) => {
    setDialogOpen(true);
    setDataToChange(data);
  };

  const handlerClose = () => {
    setDialogOpen(false);
  };

  const updateProduct = () => {
    modifyProduct(dataToChange);
    setDialogOpen(false);
  };
  return (
    <div>
      <Grid container>
        {allProducts.map(({ data, id }) => {
          return (
            <Grid key={id} container item style={{ alignItems: "center" }}>
              <Grid item xs={2}>
                {data.name}
              </Grid>
              <Grid item xs={2}>
                {data.price}
              </Grid>
              <Grid item xs={3}>
                <img src={data.image} alt="" width={"200px"} />{" "}
              </Grid>
              <Grid item xs={1.5}>
                <Button
                  variant="contained"
                  onClick={() => handleModify({ ...data, id: id })}
                >
                  Modify
                </Button>
              </Grid>
              <Grid item xs={1.5}>
                <Button
                  variant="contained"
                  onClick={() => handleDelete(id, data.image)}
                >
                  Delete
                </Button>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
      <Dialog
        style={{ padding: "20px", textAlign: "center" }}
        open={dialogOpen}
        onClose={handlerClose}
      >
        <DialogTitle>Edit This Content</DialogTitle>
        <DialogContent
          style={{ display: "grid", gridGap: "20px", padding: "30px" }}
        >
          <TextField
            value={dataToChange?.name}
            onChange={(e) =>
              setDataToChange({ ...dataToChange, name: e.target.value })
            }
            variant="outlined"
            label="name"
          />
          <TextField
            value={dataToChange?.price}
            onChange={(e) =>
              setDataToChange({ ...dataToChange, price: e.target.value })
            }
            variant="outlined"
            label="price"
          />
          <TextField
            onChange={(e) =>
              setDataToChange({ ...dataToChange, newImage: e.target.files[0] })
            }
            type={"file"}
          />
          <Button
            onClick={() => updateProduct()}
            variant="contained"
            style={{ margin: "20px" }}
          >
            Save Changes
          </Button>
          <Button onClick={() => handlerClose()}>Cancel</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default SeeProducts;
