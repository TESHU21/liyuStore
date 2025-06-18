import { z } from "zod";
import { Mail, LockKeyhole, Phone } from "lucide-react";
import { CiUser } from "react-icons/ci";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

export const SignUpSchema = z
  .object({

    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(passwordRegex, "Password must include uppercase, lowercase, number, and special character"),
    

  })
  

export const initialValues = {

  email: "",
  password: "",
 
};

export const fields = [
 
  { name: "email", placeholder: "Email", icon: Mail, type: "email", className: "col-span-2" },
  { name: "password", placeholder: "Password", icon: LockKeyhole, type: "password", className: "col-span-2 " },
  
];
