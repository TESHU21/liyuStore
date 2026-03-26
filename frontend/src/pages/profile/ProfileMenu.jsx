import React from "react";
import UserProfileMenu from "./user/UserProfileMenu";
import AdminProfileMenu from "./admin/AdminProfileMenu";

const ProfileMenu = () => {
  const user = localStorage.getItem("user");

  let parsedUser = null;
  try {
    parsedUser = user ? JSON.parse(user) : null;
  } catch {
    parsedUser = null;
  }

  const isAdmin =
    parsedUser?.isAdmin === true ||
    parsedUser?.admin === true ||
    parsedUser?.role === "admin";

  return (
    <div>
      {parsedUser ? (
        isAdmin ? (
          <AdminProfileMenu user={parsedUser} />
        ) : (
          <UserProfileMenu user={parsedUser} />
        )
      ) : (
        <p>No User</p>
      )}
    </div>
  );
};

export default ProfileMenu;
