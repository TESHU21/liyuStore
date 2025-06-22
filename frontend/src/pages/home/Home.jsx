import React from 'react'
import Hero from "./components/Hero"
import TopTrending from './components/TopTrending'
import Login from '../auth/login/Login'
import SignUp from '../auth/registration/SignUp'
const Home = () => {
  return (
    <div>
        <Hero/>
        <TopTrending/>
        {/* Add Signup and Login Dialog */}
        <Login/>
        <SignUp/>
    </div>
  )
}

export default Home