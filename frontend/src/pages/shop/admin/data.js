import {z} from "zod"
import { GraduationCap, MonitorCheck,Image,PenIcon } from "lucide-react";
export const schema=z.object({
     
      
  image: z
    .instanceof(File)
    .refine(file => file.type.startsWith("image/"), {
      message: "Only image files are allowed",
    })
    .refine(file => file.size <= 5 * 1024 * 1024, {
      message: "Image must be less than 5MB",
    }),
     name: z.string().min(3, { message: "Name should be at least three characters" }),
     // Price
  price: z.preprocess(
    (val) => {
      const num = Number(val);
      return isNaN(num) ? undefined : num;
    },
    z
      .number()
      .min(0.01, { message: 'Price must be a positive number.' })
      .max(1_000_000, { message: 'Price cannot exceed 1,000,000.' })
      .refine((val) => Number.isFinite(val), {
        message: 'Price must be a valid number.',
      })
  ),
  quantity: z.preprocess(
    (val) => {
      const num = Number(val);
      return isNaN(num) ? undefined : num;
    },
    z
      .number()
      .int({ message: 'Quantity must be an integer.' })
      .min(1, { message: 'Quantity must be at least 1.' })
      .max(10_000, { message: 'Quantity cannot exceed 10,000.' })
  ),
  brand: z.string().trim().min(2, { message: "Brand must be at least 2 characters long." }).max(50, { message: "Brand cannot exceed 50 characters." }),
// 6. Count in stock
  countInStock: z.preprocess(
    (val) => {
      if (typeof val === 'string' && val.trim() === '') return undefined;
      return Number(val);
    },
    z.number()
     .int({ message: "Count in stock must be an integer." })
     .min(0, { message: "Count in stock cannot be negative." })
     .max(100000, { message: "Count in stock cannot exceed 100,000." })
  ),

  // 7. Category
  category: z.enum(["Laptop", "Phone", "Camera", "watch", "Tablet", "Electronics", "Accessories"], {
    errorMap: (issue, ctx) => {
      if (issue.code === z.ZodIssueCode.invalid_enum_value) {
        return { message: "Please select a valid category." };
      }
      return { message: ctx.defaultError };
    }
  }),


  description: z.string()
    .min(5, "Description must be at least 5 characters")
    .max(500, "Description must be less than 500 characters"),

})
export const initialValues = {
 
  image: "",
  name:"",
  price:"",
  quantity:"",
  brand:"",
  countInStock:"",
  category:"",
 description:""
};
export const fields=[
  {
        name: "image",
        placeholder: "Select Image",
        icon:Image,
        type: "file",
        className: "col-span-2 "
      },
    {
        name: "name",
        placeholder: "Name",
        type: "text",
        className: "col-span-1 "
      },
    {
        name: "price",
        placeholder: "Price",
        type: "text",
        className: "col-span-1 "
      },
    {
        name: "quantity",
        placeholder: "Quantity",
        type: "text",
        className: "col-span-1 "
      },
    {
        name: "brand",
        placeholder: "Brand",
        type: "text",
        className: "col-span-1 "
      },
    {
        name: "countInStock",
        placeholder: "Count ",
        type: "text",
        className: "col-span-1 "
      },
    {
        name: "category",
        placeholder: "Category ",
        type: "select",
        options: [
      { value: 'Laptop', label: 'Laptop' },
      { value: 'Phone', label: 'Phone' },
      { value: 'Camera', label: 'Camera' },
      { value: 'watch', label: 'Watch' },
      { value: 'Tablet', label: 'Tablet' },
      { value: 'Electronics', label: 'Electronics' },
      { value: 'Accessories', label: 'Accessories' },
      // ... add more categories as per your actual data
    ],
        className: "col-span-1 "
      },
    
    {
        name: "description",
        placeholder: "Enter Description",
        icon:PenIcon,
        type: "textarea",
        className: "col-span-2 "
      },
]