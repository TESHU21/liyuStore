"use client";
import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NavLink } from "react-router-dom";
import { ChevronRight, AlertCircle } from "lucide-react";
import { Eye, EyeOff } from "lucide-react";

import Loader from "./Loader";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "./ui/label";
import CustomSelect from "./CustomSelect"; // Adjust path as needed

const FormComp = forwardRef(
  (
    {
      schema,
      initialValues = {},
      fields,
      onSubmit,
      submitBtnText = "Submit",
      isLoading,
      errorMessage,
      successMessage,
      showForgotPassword,
      hideButton,
    },
    ref,
  ) => {
    const form = useForm({
      resolver: zodResolver(schema),
      defaultValues: initialValues,
      mode: "onBlur",
      shouldFocusError: false,
    });

    const { trigger, formState, reset, getValues } = form;
    const { errors, isSubmitted } = formState;

    const [showPassword, setShowPassword] = useState(false);
    const [filePreviews, setFilePreviews] = useState({});

    useEffect(() => {
      const previews = {};
      fields.forEach((field) => {
        if (field.type === "file" && initialValues[field.name]) {
          previews[field.name] = initialValues[field.name];
        }
      });
      setFilePreviews(previews);
      reset(initialValues);
    }, [initialValues, reset, fields]);

    useImperativeHandle(ref, () => ({
      submitForm: () => form.handleSubmit(onSubmit)(),
      getValues,
      reset: (values) => reset(values),
    }));

    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

    const handleFileChange = (e, field, name) => {
      const file = e.target.files?.[0] || null;
      field.onChange(file);
      trigger(name);

      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setFilePreviews((prev) => ({
            ...prev,
            [name]: reader.result,
          }));
        };
        reader.readAsDataURL(file);
      } else {
        setFilePreviews((prev) => {
          const updated = { ...prev };
          delete updated[name];
          return updated;
        });
      }
    };

    // Validation icon for inputs with errors
    const ValidationIcon = ({ error, isPassword = false, isFile = false }) => {
      if (isLoading || !isSubmitted || !error) return null;

      let rightPosition = "right-3";
      if (isPassword || isFile) rightPosition = "right-10";

      return (
        <span
          className={`absolute ${rightPosition} top-1/2 transform -translate-y-1/2 text-red-500`}
        >
          <AlertCircle size={18} />
        </span>
      );
    };

    return (
      <div className="w-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col items-center w-full"
            noValidate
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              {errorMessage && (
                <p className="text-sm text-red-600 col-span-full text-center">
                  {errorMessage}
                </p>
              )}
              {successMessage && (
                <p className="text-sm text-green-600 col-span-full text-center">
                  {successMessage}
                </p>
              )}

              {fields?.map(
                ({
                  label,
                  name,
                  type,
                  placeholder,
                  className,
                  options,
                  icon: Icon,
                }) => (
                  <FormField
                    key={name}
                    control={form.control}
                    name={name}
                    render={({ field, fieldState }) => {
                      const { error } = fieldState;

                      return (
                        <FormItem className={`${className || ""} w-full`}>
                          <FormLabel>{label}</FormLabel>
                          <div className="relative w-full">
                            <FormControl>
                              {type === "select" ? (
                                <CustomSelect
                                  field={field}
                                  options={options}
                                  placeholder={placeholder}
                                  error={error}
                                />
                              ) : type === "textarea" ? (
                                <Textarea
                                  {...field}
                                  placeholder={placeholder}
                                  value={field.value || ""}
                                  rows={40}
                                  onChange={(e) => {
                                    field.onChange(e);
                                    trigger(name);
                                  }}
                                  onBlur={() => trigger(name)}
                                  className={`h-auto w-full pr-8 break-all bg-[#E6EFF5] text-black border-b-[#999999] ${
                                    error && isSubmitted
                                      ? "bg-red-200 border-red-500"
                                      : ""
                                  }`}
                                />
                              ) : type === "file" ? (
                                <>
                                  <Input
                                    id={name}
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                      handleFileChange(e, field, name)
                                    }
                                    className="hidden"
                                    placeholder={placeholder}
                                  />
                                  <Label
                                    htmlFor={name}
                                    className={`bg-[#E6EFF5] w-full border rounded-t-sm dark:bg-input/30 flex items-center justify-center px-6 cursor-pointer min-h-[120px] ${
                                      error && isSubmitted
                                        ? "bg-red-200 border-red-500"
                                        : ""
                                    }`}
                                  >
                                    {filePreviews[name] ? (
                                      <div className="relative w-fit">
                                        <img
                                          src={filePreviews[name]}
                                          alt="Preview"
                                          className="max-w-[60px] rounded shadow border object-cover"
                                        />
                                        <button
                                          type="button"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setFilePreviews((prev) => {
                                              const updated = { ...prev };
                                              delete updated[name];
                                              return updated;
                                            });
                                            field.onChange(null);
                                            trigger(name);
                                          }}
                                          className="absolute -top-2 -right-2 text-2xl cursor-pointer w-4 h-4 rounded-full border-0 flex items-center justify-center shadow text-red-600 bg-inherit"
                                          aria-label="Remove image"
                                        >
                                          &times;
                                        </button>
                                      </div>
                                    ) : (
                                      <div className="text-white h-[60px] bg-[#009CDE] w-[270px] py-[14px] flex items-center gap-2 justify-center rounded-sm">
                                        Choose file
                                      </div>
                                    )}
                                  </Label>
                                </>
                              ) : (
                                <div>
                                  {Icon && (
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                      <Icon size={18} />
                                    </span>
                                  )}
                                  <Input
                                    {...field}
                                    type={
                                      type === "password"
                                        ? showPassword
                                          ? "text"
                                          : "password"
                                        : type
                                    }
                                    id={name}
                                    placeholder={placeholder}
                                    autoComplete={
                                      name === "password"
                                        ? "current-password"
                                        : name === "email"
                                          ? "email"
                                          : "on"
                                    }
                                    onFocus={(e) => {
                                      trigger(name);
                                      field.onFocus?.(e);
                                    }}
                                    onBlur={(e) => {
                                      trigger(name);
                                      field.onBlur?.(e);
                                    }}
                                    onChange={(e) => {
                                      field.onChange(e);
                                      trigger(name);
                                    }}
                                    className={`px-10 py-2 h-[48px] bg-[#E6EFF5] w-full border rounded-t-sm text-input-text focus:outline-none focus:ring-1 focus:ring-indigo-200 focus:border-indigo-500 ${
                                      error && isSubmitted
                                        ? "bg-red-200 border-red-500"
                                        : ""
                                    }`}
                                  />
                                  {type === "password" && (
                                    <span
                                      onClick={togglePasswordVisibility}
                                      className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400"
                                    >
                                      {showPassword ? (
                                        <Eye size={18} />
                                      ) : (
                                        <EyeOff size={18} />
                                      )}
                                    </span>
                                  )}
                                </div>
                              )}
                            </FormControl>
                            {type !== "select" && (
                              <ValidationIcon
                                error={error}
                                isPassword={type === "password"}
                                isFile={type === "file"}
                              />
                            )}
                          </div>

                          <div className="py-0 h-[10px] text-sm">
                            {error && isSubmitted && (
                              <FormMessage className="text-xs text-red-600">
                                {error.message}
                              </FormMessage>
                            )}
                          </div>
                        </FormItem>
                      );
                    }}
                  />
                ),
              )}
            </div>

            {showForgotPassword && (
              <div className="w-full flex justify-start mt-2">
                <NavLink
                  to="/forgotpassword"
                  className="text-sm text-[#177DDC] hover:underline"
                >
                  Forgot password?
                </NavLink>
              </div>
            )}

            {!hideButton && (
              <div className="w-full mt-6">
                <Button
                  disabled={isLoading}
                  type="submit"
                  className="w-full h-[48px] cursor-pointer px-6 bg-blue-primary hover:bg-blue-900 text-white py-3 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <Loader />
                  ) : (
                    <>
                      {submitBtnText}
                      <ChevronRight size={22} />
                    </>
                  )}
                </Button>
              </div>
            )}
          </form>
        </Form>
      </div>
    );
  },
);

export default FormComp;
