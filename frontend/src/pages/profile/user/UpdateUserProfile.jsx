import React, { useEffect, useState } from 'react';
import { SignUpSchema, initialValues as defaultValues, fields } from "../../auth/registration/components/data";
import FormComp from '@/components/FormComp';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUserProfile, updateProfile } from "../../../store/authSlice";
import { toast } from 'sonner';
import { date } from 'zod';

const UpdateUserProfile = () => {
  const dispatch = useDispatch();

  // Local state to store user profile data
  const [profileValues, setProfileValues] = useState(defaultValues);
  const [formKey,setFormKey]=useState(Date.now())

  // Fetch current user profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await dispatch(getCurrentUserProfile()).unwrap();
        setProfileValues({
          fullName: response.fullName || '',
          email: response.email || '',
          password: '',            // Leave empty for security
          confirmPassword: '',     // Leave empty for security
        });
        setFormKey(Date.now())
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchProfile();
  }, [dispatch]);

  // Handle profile update
  const handleUpdateProfile = async (data) => {
    try {
      const response = await dispatch(updateProfile(data)).unwrap();
      console.log("Profile updated:", response);
      toast.success("Profile Updated Sucessfully!")
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };
const { error, isLoading } = useSelector((state) => state.auth);

  return (
    <div className="flex flex-col pt-10 items-center justify-center">
      <h1 className="font-lato font-semibold text-2xl mb-6">Update Profile</h1>
      <div className="w-full px-4 md:w-[900px]">
        <FormComp
          schema={SignUpSchema}
          initialValues={profileValues}
          fields={fields}
          submitBtnText="Update Profile"
          onSubmit={handleUpdateProfile}
          error={error}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default UpdateUserProfile;
