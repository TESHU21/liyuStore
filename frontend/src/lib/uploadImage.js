// src/lib/uploadImage.js
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

export const uploadImageToFirebase = async (file) => {
  if (!file) throw new Error("No file provided");
  const storageRef = ref(storage, `products/${Date.now()}-${file.name}`);
  const snapshot = await uploadBytes(storageRef, file);
  const url = await getDownloadURL(snapshot.ref);
  return url;
};
