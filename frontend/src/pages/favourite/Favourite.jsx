import React from 'react'
import PageHeader from '@/components/PageHeader'
import { headers } from './components/data'
import { useSelector } from 'react-redux'
import ProductCard from '../shop/user/ProductCard'
import { Helmet } from 'react-helmet-async'

const Favourite = () => {
  const favourite=useSelector((state)=>state.favourite.favorites)
  console.log("Favourite",favourite)
     const user = useSelector((state) => state.auth.user);
       // ⛔ Protect Cart Page for Admins
    if (user?.isAdmin) {
      // return <Navigate to="/" replace />;
      // Or you can show a message instead:
      return <p className="text-center py-20 text-lg font-semibold text-red-500">Admins cannot access favourite.</p>;
    }

return (
  <>
    <Helmet>
        <title>Favourites | Liyu Mart</title>
        <meta
          name="description"
          content="Your saved and favorite items at Liyu Mart. Shop them later easily!"
        />
      </Helmet>
    <div>
    <PageHeader header={headers} />
    <div className='mt-6 md:mt-[100px] px-[60px] mb-[60px]'>
      {favourite.length > 0 ? (
        <div className='flex gap-4 md:gap-10 flex-wrap'>
          {favourite.map((item) => (
            <ProductCard key={item._id} product={item} />
          ))}
        </div>
      ) : (
        <div className='flex justify-center  w-full'>
          <h1 className='text-center text-lg text-gray-500'>No Selected Favourite Items</h1>
        </div>
      )}
    </div>
  </div>
  </>

);

}

export default Favourite