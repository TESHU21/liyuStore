import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight } from 'lucide-react';

export function ProductCard({ title, description, imageUrl, imageAlt, linkHref, backgroundColorClass = "" }) {
  return (
    <Card className={`flex flex-col  justify-between p-4 ${backgroundColorClass}`}>
      <CardHeader className="text-start pb-2">
        <CardTitle className="  font-inter text-[22px] leading-8">{title}</CardTitle>
        <CardDescription className="font-inter text-base text-gray-600 leading-8">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center p-0">
        <img
          src={imageUrl}
          alt={imageAlt}
          className="my-4"
          style={{ width: '200px', height: '150px', objectFit: 'contain' }}
        />
    
      </CardContent>
      <CardFooter className="pt-2 gap-2 underline">
        <a href={linkHref} className="flex items-center  hover:underline">
          Shop now
          <span className="ml-1 text-sm"><ArrowUpRight size={24}/></span>
        </a>
      </CardFooter>
    </Card>
  );
}