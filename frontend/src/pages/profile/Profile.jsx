import React from 'react'
import AdminProfile from './admin/AdminProfile'

const Profile = () => {
    const user=localStorage.getItem('user')
  return (
    <div>
        {
            user.isAdmin?
            (<AdminProfile/>):(<UserProfile/>)

        }
    </div>
  )
}

export default Profile