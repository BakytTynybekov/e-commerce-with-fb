import { createContext } from "react";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import * as firestoreApp from "../firebase/firebase";
import { useEffect, useState } from "react";

export const FirestoreContext = createContext();
const refcollection = collection(firestoreApp.fireStore, "products");

export const FirestoreProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([]);
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

  const getAllProductsFromFirestore = async () => {
    const allProductsDb = await getDocs(refcollection);
    setAllProducts(
      allProductsDb.docs.map((product) => ({
        data: product.data(),
        id: product.id,
      }))
    );
  };

  onSnapshot(doc(firestoreApp.fireStore, "products", "name"), (doc) => {
    getAllProductsFromFirestore();
  });

  useEffect(() => {
    getAllProductsFromFirestore();
  }, []);

  const data = {
    addProduct: addProduct,
    allProducts: allProducts,
  };
  return (
    <FirestoreContext.Provider value={data}>
      {children}
    </FirestoreContext.Provider>
  );
};
