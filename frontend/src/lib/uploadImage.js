import { supabase } from './supabaseClient';

export async function uploadImage(file) {
  // Extract file extension
  const fileExt = file.name.split('.').pop();

  // Create a unique file name using timestamp
  const fileName = `${Date.now()}.${fileExt}`;

  // Define the full file path inside the bucket
  const filePath = `products-image/${fileName}`;

  // Upload file to the correct bucket ('products-image')
  const { error: uploadError } = await supabase.storage
    .from('products-image')
    .upload(filePath, file);

  if (uploadError) {
    console.error('Error uploading file:', uploadError.message);
    return null;
  }

  // Get the public URL of the uploaded file
  const { data, error: urlError } = supabase.storage
    .from('products-image')
    .getPublicUrl(filePath);

  if (urlError) {
    console.error('Error getting public URL:', urlError.message);
    return null;
  }

  // Return the public URL string
  return data.publicUrl;
}
