import { useState } from 'react'
import AppRoutes from './routes/AppRoutes'
import { HelmetProvider } from "react-helmet-async";



function App() {

  return (
   <div>
        <HelmetProvider>
           <AppRoutes/>
</HelmetProvider>
   
   </div>
  )
}

export default App
