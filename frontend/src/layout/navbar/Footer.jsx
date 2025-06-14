import React from 'react'
import PaypalIcon from "../../assets/paypalIcon.svg"
import MasterCardIcon from "../../assets/MastercardIcon.svg"
import VisaIcon from "../../assets/VisaIcon.svg"
const Footer = () => {
  return (
    <div className=' flex  justify-between items-center px-[40px] pt-[42px] pb-[21px]'>
      <div className=' flex items-center gap-4 '>
        <img src={VisaIcon} alt=""  className=' w-[65px] h-[65px] '/>
        <img src={PaypalIcon} alt="" className=' w-[64px] h-[64px] ' />
        <img src={MasterCardIcon} alt="" className=' w-[64.5px] h-[43px]' />

      </div>
      <p>2022 Evershop. All Rights Reserved.</p>
    </div>
  )
}

export default Footer
