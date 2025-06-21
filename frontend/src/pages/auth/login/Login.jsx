import React, { useEffect } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import FormComp from '@/components/FormComp';
import { SignUpSchema, fields, initialValues } from "./component/data";
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '@/store/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, user } = useSelector((state) => state.auth);

  const handleLogin = (data) => {
    dispatch(loginUser(data));
  };

  useEffect(() => {
    if (user?.isAdmin) {
      console.log("✅ Login successful:", user);
      navigate('/');  // Redirect to home page
    }
  }, [user, navigate]);

  return (
    <div className='flex justify-center'>
      <div className='w-[700px]'>
        <FormComp
          schema={SignUpSchema}
          fields={fields}
          initialValues={initialValues}
          submitBtnText={"Login"}
          showForgotPassword={true}
          onSubmit={handleLogin}
          isLoading={isLoading}
          errorMessage={error}
        />
      </div>
    </div>
  );
};

export default Login;
