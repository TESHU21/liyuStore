import React from 'react'
import UserProfileMenu from './user/UserProfileMenu'
import AdminProfileMenu from "./admin/AdminProfileMenu"
import { useSelector } from 'react-redux'

const ProfileMenu = () => {
    // const user=localStorage.getItem('user')
    // const parsedUser=JSON.parse(user)
    const user=useSelector((state)=>state.auth.user)
  return (
    <div>
  {user ? (
    user.isAdmin ? <AdminProfileMenu /> : <UserProfileMenu />
  ) : (
    <p>No user logged in</p>
  )}
</div>

  )
}

export default ProfileMenu