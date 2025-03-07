import React, { useState } from 'react'
import styles from "./Register.module.css"
import { useFormik } from 'formik'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [userMessage, setuserMessage] = useState(null)
  const [errMessage, seterrMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  let navigate = useNavigate()
  let validate = (values) => {

    const errors = {};
 
    if (!values.name) {
 
      errors.name = 'Required';
 
    } else if (values.name.length < 3) {
 
      errors.name = 'Must be 3 characters or less';
 
    }

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
    if (!values.rePassword) {
 
      errors.rePassword = 'rePassword is Required'
    }else if (values.rePassword !== values.password) {
 
      errors.rePassword = 'repassword not match';
 
    }


  if (!values.phone) {
 
      errors.phone = 'Phone is Required';
 
    } else if (!/^(?:\+20|0)?1[0-2,5]\d{8}$/i.test(values.phone)) {
 
      errors.phone = 'Invalid phone number';
 
    }
 
    return errors;
 
  };

let formik= useFormik({
initialValues:{
  name: "",
    email:"",
    password:"",
    rePassword:"",
    phone:""
},

validate,
onSubmit:(values)=>{
registerForm(values)
}
  })

async function registerForm(values){
  setIsLoading(false)
 return await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values).then((data)=>{
  console.log(data.data.message),
  setuserMessage(data.data.message)
  navigate("login")
 }).catch((err)=>{
  console.log(err.response.data.message);
  seterrMessage(err.response.data.message),
  setIsLoading(false)
 })
 
 
}

  return (
    <div className='w-1/2 mx-auto my-20'>
     <h1 className='text-3xl text-green-500'>Register Now:</h1>
     <p>{userMessage}</p>
    {userMessage ? <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
      </div> : null}
      <p>{errMessage}</p>
      {errMessage ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        </div> : null}
     <form onSubmit={formik.handleSubmit}>
     <div className='my-5'>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name:</label>
            <input onChange={formik.handleChange}  value={formik.values.name} onBlur={formik.handleBlur} type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            {formik.touched.name && formik.errors.name ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <p>{formik.errors.name}</p>
            </div> : null}
            
        </div>
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
     <div className='my-5'>
            <label htmlFor="rePassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">rePassword:</label>
          <input onChange={formik.handleChange}  value={formik.values.rePassword} onBlur={formik.handleBlur} type="password" id="rePassword" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
          {formik.touched.rePassword && formik.errors.rePassword ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <p>{formik.errors.rePassword}</p>
            </div> : null}
        </div>
     <div className='my-5'>
            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">phone:</label>
            <input onChange={formik.handleChange}  value={formik.values.phone} onBlur={formik.handleBlur} type="tel" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            {formik.touched.phone && formik.errors.phone ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <p>{formik.errors.phone}</p>
            </div> : null}
        </div>
      <div className='my-4 text-end'>
        {isLoading ? <button disabled={!(formik.isValid && formik.dirty)}  type='submit' className='btn bg-green-400 text-white px-2 py-4 rounded-lg'><i className='fa fa-spinner fa-spin'></i></button> : <button  type='submit' className='btn bg-green-400 text-white px-2 py-4 rounded-lg'>Register</button> }
       
        
      </div>
     </form>
    </div>
  )
}
