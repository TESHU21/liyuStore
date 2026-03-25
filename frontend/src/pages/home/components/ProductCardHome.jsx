import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";
import { setSelectedProduct } from "@/store/selectedProductSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetCurrentUserProfileQuery } from "@/store/api/authApi";

export function ProductCardHome({ product }) {
  const token = localStorage.getItem("token");
  const { data: profileData } = useGetCurrentUserProfileQuery(undefined, {
    skip: !token,
  });
  const user = profileData?.user || profileData;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleDetail = (product) => {
    if (!product?._id) return;
    if (!user) {
      return navigate("/shop");
    }

    dispatch(setSelectedProduct(product));

    navigate(`/shop/${product._id}`);
  };
  return (
    <Card className={`flex flex-col    p-4 `}>
      <CardHeader className="text-start pb-2">
        <CardTitle className="  font-inter text-[22px] leading-8">
          {product?.brand}
        </CardTitle>
        <CardDescription className="font-inter text-base text-gray-600 leading-8">
          {product?.name}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center p-0">
        <img
          src={product?.image}
          alt={product?.name}
          className="my-4"
          loading="lazy"
          style={{ width: "200px", height: "150px", objectFit: "contain" }}
        />
      </CardContent>
      <CardFooter className="pt-2 gap-2 underline">
        {!user?.isAdmin && (
          <button
            onClick={() => handleDetail(product)}
            className="flex items-center hover:underline cursor-pointer hover:text-gray-800 transition-colors"
          >
            Shop now
            <span className="ml-1 text-sm">
              <ArrowUpRight size={24} />
            </span>
          </button>
        )}
      </CardFooter>
    </Card>
  );
}
