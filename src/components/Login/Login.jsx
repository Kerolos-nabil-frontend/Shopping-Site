import React , { useContext, useState }from 'react'
import styles from "./Login.module.css"
import { useFormik } from 'formik'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TokenContext } from '../Context/TokenContext';

export default function Login() {
let {token, setToken}= useContext(TokenContext)
 const [userMessage, setuserMessage] = useState(null)
  const [errMessage, seterrMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  let navigate = useNavigate()
  let validate = (values) => {

    const errors = {};
 
    

    if (!values.email) {
 
      errors.email = 'Email Required';
 
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
 
      errors.email = 'Invalid email address';
 
    }
    if (!values.password) {
 
      errors.password = 'Password is Required'
    }else if (!/^[A-Z][a-z0-9]{3,8}$/i.test(values.password)) {
 
      errors.password = 'Invalid password';
 
    }
    
 
    return errors;
 
  };
let formik= useFormik({
initialValues:{
    email:"",
    password:"",
    
},

validate,
onSubmit:(values)=>{
loginForm(values)
}
  })
  async function loginForm(values){
    setIsLoading(false)
   return await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)  .then((data)=>{
    console.log(data.data.message),
    localStorage.setItem("userToken",data.data.token)
    setToken(data.data.token)
    setuserMessage(data.data.message)
    navigate("/")
   }).catch((err)=>{
    console.log(err.response.data.message);
    seterrMessage(err.response.data.message),
    setIsLoading(false)
   })
   
   
  }
  return (
    <div className='w-1/2 mx-auto my-20'>
     <h1 className='text-3xl text-green-500'>Login Now:</h1>
     <p>{userMessage}</p>
    {userMessage ? <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
      </div> : null}
      <p>{errMessage}</p>
      {errMessage ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        </div> : null}
     <form onSubmit={formik.handleSubmit}>
     
     <div className='my-5'>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email:</label>
            <input onChange={formik.handleChange}  value={formik.values.email} onBlur={formik.handleBlur} type="e-mail" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
       
            {formik.touched.email && formik.errors.email ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <p>{formik.errors.email}</p>
            </div> : null}
        </div>
     <div className='my-5'>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password:</label>
            <input onChange={formik.handleChange}  value={formik.values.password} onBlur={formik.handleBlur} type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            {formik.touched.password && formik.errors.password ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <p>{formik.errors.password}</p>
            </div> : null}
         </div>
    
      <div className='my-4 text-end'>
        {isLoading ? <button  type='submit' className='btn bg-green-400 text-white px-2 py-4 rounded-lg'><i className='fa fa-spinner fa-spin'></i></button> : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-green-400 text-white px-2 py-4 rounded-lg'>Login</button> }
       
        
      </div>
     </form>
    </div>
  )
}
