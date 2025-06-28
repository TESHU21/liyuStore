import React from 'react'
import PageHeader from '@/components/PageHeader'
import { headers } from './components/data'
import { useSelector } from 'react-redux'
import ProductCard from '../shop/user/ProductCard'

const Favourite = () => {
  const favourite=useSelector((state)=>state.favourite.favorites)

  return (
    <div >
      <PageHeader header={headers}/>
      <div className=' flex  gap-10 md:mt-[100px] px-[60px] mb-[60px]  '>
        {favourite.length>0?(favourite && favourite.map((item)=><ProductCard key={item._id} product={item}/>)
        
      ):(
          <h1>No Selected Favourite Items</h1>
        )}
      </div>
   
    </div>
  )
}

export default Favourite