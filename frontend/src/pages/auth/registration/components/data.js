import { z } from "zod";
import { User, Mail, LockKeyhole, Phone } from "lucide-react";
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
export const SignUpSchema = z
  .object({
    fullName: z
      .string()
      .min(2, { message: "Full Name at least two character" }),

    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        passwordRegex,
        "Password must include uppercase, lowercase, number, and special character",
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"], // where the error should appear
    message: "Passwords don't match.",
  });

export const initialValues = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const fields = [
  {
    name: "fullName",
    placeholder: "Full Name",
    icon: User,
    type: "text",
    className: "col-span-2",
  },
  {
    name: "email",
    placeholder: "Email",
    icon: Mail,
    type: "email",
    className: "col-span-2",
  },
  {
    name: "password",
    placeholder: "Password",
    icon: LockKeyhole,
    type: "password",
    className: "col-span-2 ",
  },
  {
    name: "confirmPassword",
    placeholder: "Confirm Password",
    icon: LockKeyhole,
    type: "password",
    className: "col-span-2 ",
  },
];
