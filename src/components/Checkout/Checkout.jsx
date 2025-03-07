import React, { useContext } from 'react'
import styles from "./Checkout.module.css"
import { useFormik } from 'formik'
import { cartContext } from '../Context/CartContext'

export default function Checkout() {
let {onlinePayment}= useContext(cartContext)
let formik= useFormik({
initialValues:{
   details: "",
        phone: "",
        city: ""
},

onSubmit:(values)=>{
  payOnline(values)
}
  })
async function payOnline(){
  await onlinePayment()
}
  return (
    <>
    
    <div className='w-1/2 mx-auto mt-20'>
    
    <form onSubmit={formik.handleSubmit}>
     
     <div className='my-5'>
            <label htmlFor="details" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">details:</label>
            <input onChange={formik.handleChange}  value={formik.values.details} onBlur={formik.handleBlur} type="text" id="details" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
       
            {formik.touched.details && formik.errors.details ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <p>{formik.errors.details}</p>
            </div> : null}
        </div>
     <div className='my-5'>
            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">phone:</label>
            <input onChange={formik.handleChange}  value={formik.values.phone} onBlur={formik.handleBlur} type="tel" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            {formik.touched.phone && formik.errors.phone ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <p>{formik.errors.phone}</p>
            </div> : null}
         </div>
     <div className='my-5'>
            <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">city:</label>
            <input onChange={formik.handleChange}  value={formik.values.city} onBlur={formik.handleBlur} type="text" id="city" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            {formik.touched.city && formik.errors.city ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <p>{formik.errors.city}</p>
            </div> : null}
         </div>
    
      <div className='my-4 text-end'>
        <button  type='submit' className='btn bg-green-400 text-white px-2 py-4 rounded-lg'>Pay Now :</button> 
       
        
      </div>
     </form>
    </div>
    </>
  )
}
