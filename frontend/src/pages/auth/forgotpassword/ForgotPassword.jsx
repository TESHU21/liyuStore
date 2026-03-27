import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { openModal } from "@/store/uiSlice";
import { useDispatch } from "react-redux";
import FormComp from "@/components/FormComp";
import {
  useForgotPasswordMutation,
  useResendOtpMutation,
  useResetPasswordMutation,
  useVerifyOtpMutation,
} from "@/store/api/authApi";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [step, setStep] = useState("request"); // request | verify | reset
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [forgotPassword, forgotState] = useForgotPasswordMutation();
  const [verifyOtp, verifyState] = useVerifyOtpMutation();
  const [resetPassword, resetState] = useResetPasswordMutation();
  const [resendOtp, resendState] = useResendOtpMutation();

  const requestSchema = z.object({
    email: z.string().email("Enter a valid email"),
  });

  const verifySchema = z.object({
    email: z.string().email("Enter a valid email"),
    otp: z.string().regex(/^\d{6}$/, "OTP must be a 6-digit number"),
  });

  const resetSchema = z
    .object({
      newPassword: z.string().min(6, "Password must be at least 6 characters"),
      confirmPassword: z
        .string()
        .min(6, "Password must be at least 6 characters"),
    })
    .refine((v) => v.newPassword === v.confirmPassword, {
      path: ["confirmPassword"],
      message: "Passwords do not match",
    });

  const isLoading =
    forgotState.isLoading ||
    verifyState.isLoading ||
    resetState.isLoading ||
    resendState.isLoading;

  const errorMessage = useMemo(() => {
    const err =
      forgotState.error ||
      verifyState.error ||
      resetState.error ||
      resendState.error;

    return err?.data?.message || err?.message || "";
  }, [
    forgotState.error,
    resendState.error,
    resetState.error,
    verifyState.error,
  ]);

  const handleRequestOtp = async (nextEmail) => {
    try {
      const res = await forgotPassword({ email: nextEmail }).unwrap();
      toast.success(res?.message || "OTP sent");
      setStep("verify");
    } catch (err) {
      toast.error(err?.data?.message || err?.message || "Request failed");
    }
  };

  const handleVerifyOtp = async ({ nextEmail, nextOtp }) => {
    try {
      const res = await verifyOtp({ email: nextEmail, otp: nextOtp }).unwrap();
      setResetToken(res?.resetToken || "");
      toast.success(res?.message || "OTP verified");
      setStep("reset");
    } catch (err) {
      toast.error(err?.data?.message || err?.message || "Verification failed");
    }
  };

  const handleResetPassword = async (nextPassword) => {
    try {
      const res = await resetPassword({
        email,
        resetToken,
        newPassword: nextPassword,
      }).unwrap();
      toast.success(res?.message || "Password reset successful");
      navigate("/");
      dispatch(openModal("login"));
    } catch (err) {
      toast.error(err?.data?.message || err?.message || "Reset failed");
    }
  };

  const handleResendOtp = async () => {
    if (!email.trim()) return;

    try {
      const res = await resendOtp({ email }).unwrap();
      toast.success(res?.message || "OTP resent");
    } catch (err) {
      toast.error(err?.data?.message || err?.message || "Resend failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh] px-4">
      <div className="w-full max-w-md bg-white border rounded-lg p-6">
        <h1 className="text-xl font-semibold text-center">Forgot Password</h1>

        {step === "request" ? (
          <div className="mt-6">
            <FormComp
              schema={requestSchema}
              fields={[
                {
                  name: "email",
                  label: "Email",
                  placeholder: "Enter your email",
                  type: "email",
                  className: "col-span-2",
                },
              ]}
              initialValues={{ email }}
              submitBtnText="Send OTP"
              onSubmit={(values) => {
                setEmail(values.email);
                return handleRequestOtp(values.email);
              }}
              isLoading={isLoading}
              errorMessage={errorMessage}
              hideButton={false}
            />

            <Button
              type="button"
              variant="ghost"
              className="underline mt-4 w-full"
              onClick={() => {
                navigate("/");
                dispatch(openModal("login"));
              }}
              disabled={isLoading}
            >
              Back to Login
            </Button>
          </div>
        ) : null}

        {step === "verify" ? (
          <div className="mt-6">
            <FormComp
              schema={verifySchema}
              fields={[
                {
                  name: "email",
                  label: "Email",
                  placeholder: "Enter your email",
                  type: "email",
                  className: "col-span-2",
                },
                {
                  name: "otp",
                  label: "OTP",
                  placeholder: "Enter the 6-digit OTP",
                  type: "text",
                  className: "col-span-2",
                },
              ]}
              initialValues={{ email, otp }}
              submitBtnText="Verify OTP"
              onSubmit={(values) => {
                setEmail(values.email);
                setOtp(values.otp);
                return handleVerifyOtp({
                  nextEmail: values.email,
                  nextOtp: values.otp,
                });
              }}
              isLoading={isLoading}
              errorMessage={errorMessage}
              hideButton={false}
            />

            <div className="mt-4 flex flex-col gap-2">
              <Button
                type="button"
                variant="ghost"
                className="underline w-full"
                onClick={handleResendOtp}
                disabled={isLoading}
              >
                Resend OTP
              </Button>

              <Button
                type="button"
                variant="ghost"
                className="underline w-full"
                onClick={() => setStep("request")}
                disabled={isLoading}
              >
                Change Email
              </Button>
            </div>
          </div>
        ) : null}

        {step === "reset" ? (
          <div className="mt-6">
            <FormComp
              schema={resetSchema}
              fields={[
                {
                  name: "newPassword",
                  label: "New Password",
                  placeholder: "Enter new password",
                  type: "password",
                  className: "col-span-2",
                },
                {
                  name: "confirmPassword",
                  label: "Confirm Password",
                  placeholder: "Confirm new password",
                  type: "password",
                  className: "col-span-2",
                },
              ]}
              initialValues={{ newPassword, confirmPassword }}
              submitBtnText="Reset Password"
              onSubmit={(values) => {
                setNewPassword(values.newPassword);
                setConfirmPassword(values.confirmPassword);
                return handleResetPassword(values.newPassword);
              }}
              isLoading={isLoading}
              errorMessage={errorMessage}
              hideButton={false}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ForgotPassword;
