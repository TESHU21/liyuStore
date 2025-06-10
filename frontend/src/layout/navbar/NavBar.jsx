import React ,{useState,useEffect,useRef} from 'react'
import { Button } from '../../components/ui/button'
import{LogIn,AlignJustify,X, Home} from "lucide-react"
import { House,ShoppingBag,ShoppingCart,Heart,User } from 'lucide-react';
import { useNavigate,NavLink } from "react-router-dom";



const NavBar = () => {
  const navigate=useNavigate();
  const [menuVisiblity,setMenuVisibility]=useState(false)
  const token=sessionStorage.getItem("Token")
  const menuRef = useRef(null);
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuVisibility(false);
      }
    };
  
    if (menuVisiblity) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
  
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [menuVisiblity]);

  const handleClick=()=>{
    setMenuVisibility(!menuVisiblity)
  }
  // Function for Desktop NavLink classes
  const getDesktopNavLinkClasses = ({ isActive }) =>
    `relative flex gap-2 group pb-2 transition-colors duration-200 ease-in-out ${
      isActive ? "text-blue-800" : "text-gray-700 hover:text-blue-primary"
    }
    after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[1px] after:bg-blue-600 after:transition-all after:duration-300 after:ease-in-out
    ${isActive ? "after:w-full" : "group-hover:after:w-full after:w-0"}
    `;

  // Function for Mobile NavLink classes (includes w-fit to constrain line length)
  const getMobileNavLinkClasses = ({ isActive }) =>
    `relative group pb-1 transition-colors duration-200 ease-in-out block w-fit ${ // Added w-fit here
      isActive ? "text-blue-800" : "text-gray-700 hover:text-blue-primary"
    }
    after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-red-500 after:transition-all after:duration-300 after:ease-in-out
    ${isActive ? "after:w-full" : "group-hover:after:w-full after:w-0"}
    `;
  return (
    <div className='relative' ref={menuRef}>
        {/* Desktop Menu */}
        <div className=" hidden md:flex  justify-between md:px-10  h-[80px] items-center bg-white ">
        <div className=' flex items-center gap-8   '>
            <div className=' flex gap-[2.72px] items-center'>
                <span className="font-lusitana text-[19px] font-bold leading-[100%] text-blue-primary ">Azushop</span>
            </div>
            <div className='flex gap-8 ml-[342px]'>
            <NavLink to="/" className={getDesktopNavLinkClasses}><span><Home size={24}/></span>Home</NavLink>
            <NavLink to="/shop" className={getDesktopNavLinkClasses}> <ShoppingBag  size={24}/> <span>shop</span></NavLink>


            <NavLink to="/cart" className={getDesktopNavLinkClasses}><span><ShoppingCart size={24 }/></span>cart</NavLink>
            <NavLink to="/favourite" className={getDesktopNavLinkClasses}> <span><Heart size={24}/></span>Favourite</NavLink>
       </div>
        </div>
        {
          token?(
            <div></div>
            // <ProfileMenu/>
          ):(

          <div className=" flex ">
          <Button className="py-3 px-2  bg-white  hover:bg-white text-base leading-6 font-semibold text-black border-0 md:shadow-none rounded-md  cursor-pointer" onClick={()=>navigate("/login")}>  <span className='ml-3'><LogIn size={24}/></span>Login</Button>
          <Button
  className="py-3 px-2 bg-white text-black text-base leading-6 font-semibold rounded-md border-0 cursor-pointer shadow-none hover:bg-white"
  onClick={() => navigate("/signup")}
>
  <User size={24}/> <span className=""> Register</span> 
</Button>

      </div>
      )

        }
        
        </div>
        {/* Mobile Menu */}
        <div className='md:hidden flex justify-between p-[17px]  items-center'>
          <div className='flex items-center text-blue-primary gap-[2.3px]'> 
          <span className=' font-bold font-lusitana text-[16.54px] leading-[100%] '>CLient</span>
          </div>
         { menuVisiblity? (<X onClick={handleClick}/>) :(<AlignJustify onClick={handleClick}/>)}
        

        </div>

        {menuVisiblity && (
  <div className="md:hidden fixed right-0 md:top-[56px] top-10 z-50 w-[269px] min-h-screen shadow-md bg-white pl-[21px] pt-[25px] flex flex-col">
    <ul className="flex flex-col gap-4">
      <li>
                    <NavLink to="/" className={({isActive})=>`${isActive ? "text-blue-primary ":""} flex items-center gap-2`}><span><Home size={24}/></span>Home</NavLink>

      </li>
      <li>
        <NavLink to="/shop" className={({ isActive }) => `${isActive ? "text-blue-primary" : ""} flex items-center gap-2` }> <ShoppingBag  size={24}/> <span>shop</span></NavLink>

      </li>
      <li>
      <NavLink to="/cart" className={({isActive})=>`${isActive ? "text-blue-primary":""} flex items-center gap-2`}><span><ShoppingCart size={24 }/></span>cart</NavLink>

      </li>
      <li>

                    <NavLink to="/favourite" className={({isActive})=>`${isActive ? "text-blue-primary":""} flex items-center gap-2`}> <span><Heart size={24}/></span>Favourite</NavLink>

      </li>
    </ul>
           <div className=" flex flex-col items-start justify-start">
          <Button className="py-3 px-2   bg-white  hover:bg-white text-base leading-6 font-semibold text-black border-0 md:shadow-none rounded-md  cursor-pointer" onClick={()=>navigate("/login")}>  <span className=''><LogIn size={26}/></span>Login</Button>
          <Button
  className="py-3 px-2 bg-white text-black text-base leading-6 font-semibold rounded-md border-0 cursor-pointer shadow-none hover:bg-white"
  onClick={() => navigate("/signup")}
>
   <span className=""><User size={26} /></span> Register
</Button>

      </div>
  </div>
)}

    </div>
  )
}

export default NavBar