import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from './navbar/NavBar'
import Footer from './navbar/Footer'

const Layout = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <NavBar />
      <main className='flex-grow'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
