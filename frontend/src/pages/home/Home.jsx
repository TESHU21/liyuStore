import React from 'react'
import Hero from "./components/Hero"
import TopTrending from './components/TopTrending'
import Login from '../auth/login/Login'
const Home = () => {
  return (
    <div>
        <Hero/>
        <TopTrending/>
        <Login/>
    </div>
  )
}

export default Home