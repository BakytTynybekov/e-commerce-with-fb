import { createContext } from "react";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  onSnapshot,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import * as firestoreApp from "../firebase/firebase";
import { useEffect, useState } from "react";
import { async } from "@firebase/util";

export const FirestoreContext = createContext();

const refcollection = collection(firestoreApp.fireStore, "products");
const refcollectionOrders = collection(firestoreApp.fireStore, "orders");

export const FirestoreProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [allOrders, setAllOrders] = useState([]);

  const addProduct = async (newProduct, image) => {
    const refHosting = ref(firestoreApp.storage, `images/${image.name}`);
    const uploadImage = uploadBytesResumable(refHosting, image);

    uploadImage.on(
      "state_change",
      (snapshot) => {},
      (err) => {
        console.log(err.message);
      },
      () =>
        getDownloadURL(uploadImage.snapshot.ref).then((url) =>
          addDoc(refcollection, { ...newProduct, image: url })
        )
    );
  };

  // save or create a new order
  const saveOrder = async (ourcard, userData) => {
    addDoc(refcollectionOrders, { ...ourcard, ...userData });
  };

  // this function get the data from firestore and save it in my state
  const getAllProductsFromFirestore = async () => {
    const allProductsDb = await getDocs(refcollection);
    setAllProducts(
      allProductsDb.docs.map((product) => ({
        data: product.data(),
        id: product.id,
      }))
    );
  };

  useEffect(() => {
    getAllProductsFromFirestore();
  }, []);

  // this function will get all the orders
  const getAllOrders = async () => {
    const ordersFromFirestore = await getDocs(refcollectionOrders);
    setAllOrders(
      ordersFromFirestore.docs.map((order) => ({
        data: order.data(),
        id: order.id,
      }))
    );
  };

  // this is an observer that check if there is new data on my database that is located on firestore
  onSnapshot(doc(firestoreApp.fireStore, "products", "name"), (doc) => {
    getAllProductsFromFirestore();
  });

  // this function will delete the product from the products
  const deleteProduct = async (id, img) => {
    await deleteDoc(doc(firestoreApp.fireStore, "products", id));
    deleteImage(img);
  };

  // this function will delete the image from storage
  const deleteImage = (img) => {
    const refToImage = ref(firestoreApp.storage, `images/${img}`);
    deleteObject(refToImage)
      .then(() => {
        console.log("image was deleted");
      })
      .catch((err) => console.log(err.message));
  };

  // this function will modify the Product
  const modifyProduct = (newData) => {
    console.log(newData.newImage.name);

    if (newData.newImage) {
      var newImg = [];
      const refHosting = ref(
        firestoreApp.storage,
        `images/${newData.newImage.name}`
      );

      const uploadImage = uploadBytesResumable(refHosting, newData.newImage);

      uploadImage.on(
        "state_change",
        (snapshot) => {},
        (err) => {
          console.log(err.message);
        },
        () => {
          getDownloadURL(uploadImage.snapshot.ref).then((url) => {
            const refToTheDocumnet = doc(
              firestoreApp.fireStore,
              "products",
              newData.id
            );

            const dataClean = { ...newData };
            let oldImg = dataClean.image;

            const start = oldImg.indexOf("%");
            const end = oldImg.indexOf("?");

            oldImg = oldImg
              .split("")
              .slice(start + 3, end)
              .join("");

            deleteImage(oldImg);
            delete dataClean.id;
            delete dataClean.newImage;
            dataClean.image = url;
            console.log(dataClean);
            updateDoc(refToTheDocumnet, { ...dataClean });
          });
        }
      );
    } else {
      const refToTheDocumnet = doc(
        firestoreApp.fireStore,
        "products",
        newData.id
      );
      const dataClean = { ...newData };
      delete dataClean.id;
      updateDoc(refToTheDocumnet, { ...dataClean });
    }
  };

  // My fireStoreContext Data
  const data = {
    addProduct: addProduct,
    allProducts: allProducts,
    deleteProduct: deleteProduct,
    deleteImage: deleteImage,
    modifyProduct: modifyProduct,
    saveOrder: saveOrder,
    allOrders: allOrders,
    getAllOrders: getAllOrders,
  };
  return (
    <FirestoreContext.Provider value={data}>
      {children}
    </FirestoreContext.Provider>
  );
};
