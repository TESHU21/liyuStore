import { MapPin } from 'lucide-react';
import {z} from "zod"

export const checkoutSchema = z.object({
  address: z.string().min(1, "Address is required"), // Assuming address is a string and required
  city: z.string().optional(), // Assuming city is a string and optional
  postalCode: z.string().optional(), // Assuming postal code is a string and optional, could add regex for format
  country: z.string().optional(), // Assuming country is a string and optional
});
  

export const initialValues = {

  address: "",
  city: "",
  postalCode:"",
  country:""
 
};

export const fields = [
 
  { name: "address", placeholder: "Address", icon: MapPin, type: "text", className: "col-span-2" },
  { name: "city", placeholder: "City", type: "text", className: "col-span-2 " },
  { name: "postalCode", placeholder: "City", type: "text", className: "col-span-2 " },
  { name: "country", placeholder: "Country", type: "text", className: "col-span-2 " },
  
];