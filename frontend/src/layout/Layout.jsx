import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from './navbar/NavBar'
import Footer from './navbar/Footer'
import Login from '@/pages/auth/login/Login'
import SignUp from '@/pages/auth/registration/SignUp'
import { Toaster } from "@/components/ui/sonner"


const Layout = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <NavBar />
      <main className='flex-grow'>
        <Outlet />
        {/* Add Signup and Login Dialog */}
        
      </main>
      <Toaster position="top-right"  toastOptions={{
    className: 'mt-[80px] ', // push down to not overlap top navbar or profile
  }}/>

     <Login/>
        <SignUp/> 

     
      <Footer />
    </div>
  )
}

export default Layout
