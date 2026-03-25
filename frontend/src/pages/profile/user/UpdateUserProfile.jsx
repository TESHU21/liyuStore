import React, { useEffect, useState } from "react";
import {
  SignUpSchema,
  initialValues as defaultValues,
  fields,
} from "../../auth/registration/components/data";
import FormComp from "@/components/FormComp";
import {
  useGetCurrentUserProfileQuery,
  useUpdateProfileMutation,
} from "@/store/api/authApi";
import { toast } from "sonner";

const UpdateUserProfile = () => {
  // Local state to store user profile data
  const [profileValues, setProfileValues] = useState(defaultValues);
  const [formKey, setFormKey] = useState(Date.now());

  const token = localStorage.getItem("token");
  const {
    data: profileData,
    isLoading: isProfileLoading,
    error: profileError,
  } = useGetCurrentUserProfileQuery(undefined, {
    skip: !token,
  });
  const user = profileData?.user || profileData;

  const [updateProfileMutation, { isLoading: isUpdating, error: updateError }] =
    useUpdateProfileMutation();

  // Fetch current user profile on mount
  useEffect(() => {
    if (!user) return;
    setProfileValues({
      fullName: user.fullName || "",
      email: user.email || "",
      password: "", // Leave empty for security
      confirmPassword: "", // Leave empty for security
    });
    setFormKey(Date.now());
  }, [user]);

  // Handle profile update
  const handleUpdateProfile = async (data) => {
    try {
      await updateProfileMutation(data).unwrap();
      toast.success("Profile Updated Sucessfully!");
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error(
        error?.data?.message || error?.message || "Failed to update profile",
      );
    }
  };

  const errorMessage =
    updateError?.data?.message ||
    updateError?.message ||
    profileError?.data?.message ||
    profileError?.message;

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
          error={errorMessage}
          isLoading={isProfileLoading || isUpdating}
          key={formKey}
        />
      </div>
    </div>
  );
};

export default UpdateUserProfile;
