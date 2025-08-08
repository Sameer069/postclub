import {Button, TextField} from '@mui/material';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from "yup"
import API from '../component/axiosConfig';
import { useState } from 'react';
import {useCookies} from "react-cookie"
import { useNavigate } from 'react-router-dom';
const  UserLogin=()=> {
     const[usernameError,setUsernameError]=useState()
     const[userPasswordError,setUserPasswordError]=useState()
     const[hide,setHide]=useState(false)
     const[cookie,setCookies,removeCookies]=useCookies(["token"])
     const navigate=useNavigate()
    
  const formik=useFormik({
    initialValues:{
      username:"",
      password:""
    },
    validationSchema:yup.object({
      username:yup.string().required('username is required'),
      password:yup.string().required("password is required")
    }),
    onSubmit:async(value)=>{
     const user={...value,username:value.username.toLowerCase()}
      try{
        const response= await API.post("/login-user",user,{withCredentials:true})
        setCookies("token",response.data.token,{expires:new Date(Date.now()+7*24*60*60*1000)})
        navigate("/index")
       
      }
      catch(err){
      if(err.response.status===404){
        setHide(true)
        setUsernameError(err.response.data.errors)
        setUserPasswordError("")
        console.log(err)
      }
      else{
        setHide(true)
        setUsernameError("")
        setUserPasswordError(err.response.data.errors)
        console.log(err)
      }
      }
    }
  })

    


  const handleChange=(e)=>{
    setHide(false)
    const{name,value}=e.target

    formik.setFieldValue(name,value)

  }

  

  return (
  
    <div className="h-[100vh] flex justify-center">
        <div className='w-[300px] flex flex-col justify-between'>
             <div className='text-center mt-1.5'>
                <select className='outline-none text-[20px]'>
                      <option>English</option>
                      <option>Hindi</option>
                </select>
             </div>
             <div>
                    <div className='text-center w-full'>
                        <h1 className="text-[60px] font-[Grand_Hotel]">Postclub</h1>
                    
                    </div>
                     <div className='w-full text-center'>
                        <Button sx={{width:"100%"}} variant='contained'><FacebookOutlinedIcon className='me-2'/> Continue using facebook</Button>
                     </div>
                    <div className='w-full my-3'>
                         <span className='w-full border-[1px] relative border-stone-200 inline-block'>
                           <span className='absolute left-1/2 right-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center bg-white w-[100px]'>OR</span>
                         </span>
                    </div>
                    <div>
                        <form onSubmit={formik.handleSubmit}>
                        <div>
                        <TextField variant='outlined' onBlur={formik.handleBlur}  onChange={handleChange} name='username' label="username" className='w-full'></TextField>
                        <span className='text-red-600's>{formik.touched.username&&formik.errors.username&&(<span>{formik.errors.username}</span>)}</span>
                        <span className={hide?"inline text-red-600":"hidden"}>{usernameError}</span>
                        </div>
                        <div className='my-3'>
                        <TextField type='password' onBlur={formik.handleBlur} onChange={handleChange} name='password' variant='outlined' label="password" className='w-full'></TextField>
                        <span className='text-red-600'>{formik.touched.password&&formik.errors.password&&(<span>{formik.errors.password}</span>)}</span>
                        <span className={hide?"inline text-red-600":"hidden"}>{userPasswordError}</span>
                        </div>
                        <div className='text-end my-3'>
                        <span className='font-[Poppins] text-[#1565C0]'>Forget Password?</span>
                        </div>
                        <div>
                        <Button variant='contained' type='submit' className='w-full'>Login</Button>
                        </div>
                        <div className='ps-[19px] mt-5 font-[Poppins]'>
                           <span>Don't have an account?<Link to="/signup" className='text-[#1565C0]'>Signup</Link></span>
                        </div>
                        <div className='mt-2'>
                        <p className=' text-center text-[14px]'>
                        By Continuing you agree to Postclub Term of use and privacy Policy.
                        </p>
                        </div>
                        </form>
                    
                    </div>




                
             </div>

                    <div className='text-center'>
                          <div className='text-[25px]'>form</div>
                          <div className='text-[17px]'><AcUnitIcon/>SAMS</div>
                    </div>

        </div>       

    </div>
  )
}

export default UserLogin
