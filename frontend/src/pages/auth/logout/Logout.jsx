import React from 'react'
import { useDispatch } from 'react-redux'
import { Button } from '@/components/ui/button'
import { logout } from '@/store/authSlice'

const Logout = () => {
    const dispatch=useDispatch()
    const handleLogOut=()=>{
        dispatch(logout())

    }
  return (
    <Button
            className=" border-none bg-transparent text-black hover:bg-transparent ml-0 p-0 m-0 text-normal cursor-pointer"
            onClick={handleLogOut}

    >Logout
    </Button>
  )
}

export default Logout