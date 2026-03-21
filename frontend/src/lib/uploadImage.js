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
    return response.data.secure_url || response.data.url;
  } catch (error) {
    console.error("Error uploading Image:", error);
    return null;
  }
}
