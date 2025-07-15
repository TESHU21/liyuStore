import React, { useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import FormComp from '@/components/FormComp';
import { SignInSchema, fields, initialValues } from "./component/data";
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '@/store/authSlice';
import { closeLogin,openSignup } from '@/store/uiSlice';

const Login = () => {
  const dispatch = useDispatch();
  const { isLoginOpen } = useSelector((state) => state.ui);
  const { isLoading, error, user } = useSelector((state) => state.auth);

  const handleLogin = (data) => {
    dispatch(loginUser(data));
   
  };

  useEffect(() => {
    if (user) {
      dispatch(closeLogin());  // Auto-close on success
    }
  }, [user, dispatch]);

  return (
    <Dialog open={isLoginOpen} onOpenChange={(open) => !open && dispatch(closeLogin())}>
      <DialogContent className="  ">
        <DialogHeader>
          <DialogTitle className="text-[24px]  font-normal  ">Login</DialogTitle>
          <DialogDescription className="sr-only">Please enter your credentials.</DialogDescription>
        </DialogHeader>

        <FormComp
          schema={SignInSchema}
          fields={fields}
          initialValues={initialValues}
          submitBtnText="Login"
          showForgotPassword={true}
          onSubmit={handleLogin}
          isLoading={isLoading}
          errorMessage={error}
        />

        <DialogFooter className=" flex justify-center">
          <p className='underline cursor-pointer text-center mt-[44px] mb-4' onClick={()=>{
          dispatch(closeLogin())
          dispatch(openSignup())
          }}>New customer? Create your account</p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Login;
