// components/ProductCard.jsx
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator"; // Assuming you have Separator
import { ShoppingCart, Heart, Eye } from 'lucide-react'; // Import icons

const ProductCard = ({ product }) => {
  return (
    <Card className="w-[300px] sm:w-[280px] md:w-[300px] lg:w-[340px] xl:w-[340px] flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 bg-[#F9FBFC]">
      <CardHeader className="p-4 pb-2 text-right">
        <span className="text-xs font-semibold text-blue-primary leading-6">{product.brand}</span>
      </CardHeader>

      <CardContent className="flex flex-col items-center p-4 pt-0">
        <div className="relative w-full h-40 flex items-center justify-center mb-4">
       
          <img src={product.image} alt={product.name} />
        </div>
        <h3 className="text-base font-semibold text-center leading-tight mb-1">{product.name}</h3>
        <p className="text-xs text-gray-600 text-center whitespace-pre-line leading-snug">
          {product.description}
        </p>
      </CardContent>

      <CardFooter className="p-4 pt-2 flex flex-col items-center">
        <Separator className="w-full mb-3" />
        <div className="flex justify-between items-center w-full">
          <span className="text-lg font-bold text-gray-800">${product.price.toFixed(2)}</span>
          <div className="flex space-x-3 text-gray-500">
            <ShoppingCart className="w-5 h-5 cursor-pointer hover:text-blue-600 transition-colors" />
            <Heart className="w-5 h-5 cursor-pointer hover:text-red-500 transition-colors" />
            <Eye className="w-5 h-5 cursor-pointer hover:text-gray-800 transition-colors" />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;