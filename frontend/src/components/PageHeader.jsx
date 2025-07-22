import React from 'react';
import { Link } from "react-router-dom";
import { SlashIcon } from "lucide-react";
import HeaderBackgroundImage from "../../src/assets/HH2.webp";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const PageHeader = ({ header }) => {
  return (
    <div>
      {/* Header Section with Background Image */}
      <div
        className="flex flex-col items-center justify-center gap-3 md:gap-8 md:h-[200px] h-[150px] bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 92, 160, 0.7), rgba(0, 92, 150, 0.7)), url(${HeaderBackgroundImage})`,
        }}
      >
        <h1 className="font-lato text-white font-bold md:text-[60px] text-[24px] md:leading-[86px] text-center">
          {header?.title}
        </h1>
        <p className="font-semibold md:text-[20px] text-sm px-4 md:px-16 text-white text-center">
          {header?.description}
        </p>
      </div>

      {/* Breadcrumb */}
      <div className="flex justify-center pt-[22px]">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/" className="md:text-[20px]">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <SlashIcon />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="md:text-[20px]">{header?.currentPage}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
};

export default PageHeader;
