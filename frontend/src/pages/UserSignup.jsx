import {Button, TextField} from '@mui/material';
import { Link } from 'react-router-dom';
import{useFormik} from "formik"
import * as yup from "yup"
import API from '../component/axiosConfig';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserSignUp=()=>{

   const[emailerror,setEmailerror]=useState()
   const[usernameError,setUsernameError]=useState()
   const[hide,setHide]=useState(false)
   const navigate=useNavigate()
   const formik=useFormik({
    initialValues:{
      fullname:"",
      username:"",
      email:"",
      password:""
    },
    validationSchema:yup.object({
      fullname:yup.string().required("FullName required"),
      username:yup.string().required("UserName is required"),
      email:yup.string().matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"eg:example09@gmail.com").required("email is required"),
      password:yup.string().required("Password is required")


    }),
    onSubmit:async(userData,{setErrors})=>{
      const user={...userData,email:userData.email.toLowerCase(),username:userData.username.toLowerCase()}
       try{
          const response=await API.post("/register-user",user)
          if(response.status===200){
            navigate("/")
          }
       }
       catch(err){
        if(err.response.status===409){
          setHide(true)
         setEmailerror(err.response.data.errors)
         setUsernameError("")
        }
        else{
          setHide(true)
         setUsernameError(err.response.data.errors)
         setEmailerror("")
        }
       }
    }

   })

   const handleChange=(e)=>{
       setHide(false)
      
      const{name,value}=e.target;
      formik.setFieldValue(name,value)
      
          
   }


      return(
        <div className="h-[100vh] font-[Poppins] flex justify-center">
        <div className='w-[300px] flex flex-col justify-evenly'>
              <div className='h-[100px] flex justify-center items-center'>
              
                 <h1 className='text-[25px] font-bold'>Register</h1>
              </div>
             <div>
                    <div className='text-center w-full'>
                    <div className='text-center mb-2'>
                    <select className='outline-none text-[20px]'>
                          <option>English</option>
                          <option>Hindi</option>
                    </select>
                 </div>
                    
                    </div>
                    
                    <div>
                       <form onSubmit={formik.handleSubmit} >
                        <div>
                        <TextField variant='outlined' onChange={formik.handleChange} onBlur={formik.handleBlur} name='fullname' label="fullname" className='w-full'></TextField>
                        <span className='text-red-600'>{formik.touched.fullname&&formik.errors.fullname&&(<span>{formik.errors.fullname}</span>)}</span>
                        </div>
                        <div className='my-3'>
                        <TextField variant='outlined' onChange={handleChange} onBlur={formik.handleBlur} name='username' label="username" className='w-full'></TextField>
                        <span className='text-red-600'>{formik.touched.username&&formik.errors.username&&(<span>{formik.errors.username}</span>)}</span>
                          <span className={hide?"inline text-red-600":"hidden"}>{usernameError}</span>
                       
                        </div>
                        <div>
                        <TextField variant='outlined' onChange={handleChange} onBlur={formik.handleBlur} name='email' label="email" className='w-full'></TextField>
                        <span className='text-red-600'>{formik.touched.email&&formik.errors.email&&(<span>{formik.errors.email}</span>)}</span>
                        <span className={hide?"inline text-red-600":"hidden"}>{emailerror}</span>
                        </div>
                        <div className='my-3'>
                        <TextField type='password' onChange={formik.handleChange} onBlur={formik.handleBlur} name='password' variant='outlined' label="password" className='w-full'></TextField>
                        <span  className='text-red-600'>{formik.touched.password&&formik.errors.password&&(<span>{formik.errors.password}</span>)}</span>
                        </div>
                        
                        <div>
                        <Button variant='contained' type='submit' className='w-full'>Signup</Button>
                        </div>
                       
                        </form>
                    </div>
                
             </div>

                    <div className='text-center'>
                    <div className='ps-[19px] mt-5 font-[Poppins]'>
                    <span>Alredy have an account?<Link to="/"  className='text-[#1565C0]'>Signin</Link></span>
                 </div>
                    </div>

        </div>       

    </div>
  )
      
}

export default UserSignUp;
