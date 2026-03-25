import React from "react";
import UserProfileMenu from "./user/UserProfileMenu";
import AdminProfileMenu from "./admin/AdminProfileMenu";
import { useGetCurrentUserProfileQuery } from "@/store/api/authApi";

const ProfileMenu = () => {
  // const user=localStorage.getItem('user')
  // const parsedUser=JSON.parse(user)
  const token = localStorage.getItem("token");
  const { data: profileData } = useGetCurrentUserProfileQuery(undefined, {
    skip: !token,
  });
  const user = profileData?.user || profileData;
  return (
    <div>
      {user ? (
        user.isAdmin ? (
          <AdminProfileMenu user={user} />
        ) : (
          <UserProfileMenu user={user} />
        )
      ) : (
        <p>No User</p>
      )}
    </div>
  );
};

export default ProfileMenu;
