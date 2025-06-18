import React,{useState} from 'react'
import FormComp from '@/components/FormComp'
import {SignUpSchema,fields,initialValues} from "./component/data"


const Login = () => {
      const [isLoading,setIsLoading]=useState(false)
    const [successMessage,setSuccessMessage]=useState("")
    const [errorMessage,setErrorMessage]=useState("")
    const handleLogin=()=>{
        console.log("Enter your passwords")
    }
  return (
    <div>
     <FormComp schema={SignUpSchema} fields={fields} initialValues={initialValues} submitBtnText={"Login"}
              showForgotPassword={true} onSubmit={handleLogin} isLoading={isLoading}  errorMessage={errorMessage} />
    </div>
  )
}

export default Login