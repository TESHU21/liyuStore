import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from './navbar/NavBar'
import Footer from './navbar/Footer'
import Login from '@/pages/auth/login/Login'
import SignUp from '@/pages/auth/registration/SignUp'

const Layout = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <NavBar />
      <main className='flex-grow'>
        <Outlet />
        {/* Add Signup and Login Dialog */}
        <Login/>
        <SignUp/>
      </main>
      <Footer />
    </div>
  )
}

export default Layout
