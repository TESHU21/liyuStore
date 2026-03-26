import React from "react";
import AdminProfile from "./admin/AdminProfile";
import UpdateUserProfile from "./user/UpdateUserProfile";
import { useGetCurrentUserProfileQuery } from "@/store/api/authApi";

const Profile = () => {
  const token = localStorage.getItem("token");
  const { data: profileData, isLoading } = useGetCurrentUserProfileQuery(
    undefined,
    {
      skip: !token,
    },
  );
  const user = profileData?.user || profileData;

  if (!token) return null;
  if (isLoading) return null;
  if (!user) return null;

  return <div>{user.isAdmin ? <AdminProfile /> : <UpdateUserProfile />}</div>;
};

export default Profile;
