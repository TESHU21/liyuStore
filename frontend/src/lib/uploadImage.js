import axiosInstance from "./axiosInstance";
export async function uploadImage(file) {
  if (!file) {
    console.log("No file Provided");
    return null;
  }
  try {
    const formData = new FormData();
    formData.append("image", file);
    //
    const response = await axiosInstance.post("/api/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log("Upload Response:", response.data);
    return response.data.secure_image || response.data.image;
  } catch (error) {
    console.error("Error uploading Image:", error);
    return null;
  }
}
