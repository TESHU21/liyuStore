// components/ProductCard.jsx
import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator"; // Assuming you have Separator
import { ShoppingCart, Heart, Eye ,Pencil,Trash2} from 'lucide-react'; // Import icons
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { useNavigate,useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedProduct } from "@/store/selectedProductSlice";
import { addProductToFavorite,removeProductFromFavorite } from "@/store/favoriteSlice";
import {addProductToCart} from "../../../store/cartSlice"
import { toast } from "sonner"



const ProductCard = ({  product, onEdit }) => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
      const user=useSelector((state)=>state?.auth.user)
      const location = useLocation();
    const isFavouritePage = location.pathname === '/favourite';



      const handleDetail=(product)=>{
       
        dispatch(setSelectedProduct(product))

        navigate(`/shop/${product._id}`)
      }
      const handleAddToFavourite=(product)=>{
        dispatch(addProductToFavorite(product))
         toast.success("You Added Item to Favourite sucessfully! ")



      }
      const handleAddToCart = () => {
          if (!product) return;
      
          dispatch(
            addProductToCart({
             
              ...product,
              quantity: parseInt(1, 10),
            })
          );
          toast.success("You Added Item to cart sucessfully! ")
        };
      const handleRemoveProduct=(product)=>{
        console.log("Id",product._id)
        dispatch(removeProductFromFavorite(product._id))
                  toast.error("You removed Items from favourite sucessfully! ")

      }
  
  return (
    <Card className="w-[300px] py-1 rounded-sm sm:w-[280px] md:w-[300px] lg:w-[340px] xl:w-[340px]  flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 bg-[#F9FBFC]">
      <CardHeader className=" text-right">
        <span className="text-xs font-semibold text-blue-primary leading-6">{product.brand}</span>
      </CardHeader>

      <CardContent className="flex flex-col gap-0 py-1 items-center  ">
        <div className="relative flex items-center justify-center mb-4">
       
          <img src={product.image} alt={product.name} className=" w-full h-[159px] object-cover"/>
        </div>
        <div className="flex flex-col gap-2 justify-center items-center">
        <h3 className="text-base font-semibold text-center leading-tight mb-1">{product.name}</h3>
        <p className="text-xs text-gray-600 text-center whitespace-pre-line leading-snug">
          {product.description}
        </p>
         <p className="text-base font-bold text-blue-primary">${product.price.toFixed(2)}</p>
         </div>

      </CardContent>

      <CardFooter className=" flex flex-col items-center pb-6">
        {
          user?.isAdmin?(
               <div className="w-full">
                        <Separator className="w-full mb-3" />
                        
                        <div className=" flex justify-between">
                          
          <Button className="text-lg font-bold  cursor-pointer bg-inherit text-blue-primary shadow-none border-0 hover:bg-inherit " onClick={() => onEdit(product)}><Pencil /></Button>
          <div className="flex space-x-3 text-gray-500">
     <p>{new Date(product.createdAt).toISOString().slice(2, 10)}</p>

                        </div>

    
          </div>
        </div>
          ):
        (
               <div className="flex  justify-center items-center w-full">
        <div className="flex space-x-3 text-gray-500">
  <button className="py-0" onClick={()=>handleAddToCart(product)}>
    <ShoppingCart className="w-5 h-5 cursor-pointer hover:text-blue-600 transition-colors" />
  </button>
  <button onClick={() => handleAddToFavourite(product)}>
    <Heart className="w-5 h-5 cursor-pointer hover:text-red-500 transition-colors" />
  </button>
  <button onClick={() => handleDetail(product)}>
    <Eye className="w-5 h-5 cursor-pointer hover:text-gray-800 transition-colors" />
  </button>
 
    {
      isFavouritePage&&<button onClick={()=>handleRemoveProduct(product)}><Trash2 className="w-5 h-5 cursor-pointer fill-red-500 transition-colors text-red-500"/></button>
    }
  


</div>

        </div>
          )
        }
       
      </CardFooter>
    </Card>
  );
};

export default ProductCard;