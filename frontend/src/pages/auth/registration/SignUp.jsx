import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import FormComp from "@/components/FormComp";
import { SignUpSchema, fields, initialValues } from "./components/data";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "@/store/authSlice";
import { closeModal, openModal } from "@/store/uiSlice";

const SignUp = () => {
  const dispatch = useDispatch();
  const { activeModal } = useSelector((state) => state.ui);
  const { isLoading, error, user } = useSelector((state) => state.auth);

  const handleSignUp = (data) => {
    dispatch(registerUser(data));
  };

  useEffect(() => {
    if (user) {
      dispatch(closeModal()); // Auto-close on success
    }
  }, [user, dispatch]);

  return (
    <Dialog
      open={activeModal === "signup"}
      onOpenChange={(open) => !open && dispatch(closeModal())}
    >
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle className="text-[24px]  font-normal  ">
            Register
          </DialogTitle>
          <DialogDescription className="sr-only">
            Please enter your credentials.
          </DialogDescription>
        </DialogHeader>

        <FormComp
          schema={SignUpSchema}
          fields={fields}
          initialValues={initialValues}
          submitBtnText="Register"
          showForgotPassword={false}
          isLoading={isLoading}
          errorMessage={error}
          onSubmit={handleSignUp}
        />

        <DialogFooter className=" flex justify-center">
          <p
            className="underline cursor-pointer text-center mt-[44px] mb-4"
            onClick={() => {
              dispatch(openModal("login"));
            }}
          >
            Already have an account? login in here
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SignUp;
