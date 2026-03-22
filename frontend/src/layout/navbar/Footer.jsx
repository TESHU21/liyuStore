import React from "react";
import PaypalIcon from "../../assets/paypalIcon.svg";
import MasterCardIcon from "../../assets/MastercardIcon.svg";
import VisaIcon from "../../assets/VisaIcon.svg";
const Footer = () => {
  return (
    <div className=" flex flex-col md:flex-row justify-between items-center px-[40px] pt-[42px] pb-[21px] border-t">
      <div className=" flex items-center gap-4 ">
        <img
          src={VisaIcon}
          loading="lazy"
          alt=""
          className=" w-[65px] h-[65px] "
        />
        <img
          src={PaypalIcon}
          loading="eager"
          alt=""
          width="64"
          height="64"
          className=" w-[64px] h-[64px] "
        />
        <img
          src={MasterCardIcon}
          loading="lazy"
          alt=""
          className=" w-[64.5px] h-[43px]"
        />
      </div>
      © 2026 LiyuStore.All rights reserved.
    </div>
  );
};

export default Footer;
