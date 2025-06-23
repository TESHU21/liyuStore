import React from 'react'
import ShopUser from './user/ShopUser'
import { useSelector } from 'react-redux'
import ProductAdmin from "../../pages/shop/admin/ProductAdmin"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

const Shop = () => {
    const user=useSelector((state)=>state?.auth.user)
console.log("user",user)


  return (
    <div>
        {user?.isAdmin?(<ProductAdmin/>):(<ShopUser/>)}
    </div>
  )
}

export default Shop