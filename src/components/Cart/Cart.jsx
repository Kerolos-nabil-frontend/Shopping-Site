import React, { useContext, useEffect, useState } from 'react'
import styles from "./Cart.module.css"
import { cartContext } from '../Context/CartContext'
import Loader from '../Loader/Loader'
import { Link } from 'react-router-dom'

export default function Cart() {
  const [cartItems, setCartItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  let {getCart, removeCartItem,updateCart, removeAllCart,totalCartPrice}= useContext(cartContext);

  async function getAllCart(){
    let response= await getCart();
    console.log(response);
    setCartItems(response?.data?.data?.products),
    setIsLoading(false)
  }
  async function removeProduct(productId){
    let response= await removeCartItem(productId);
    console.log(response);
    setCartItems(response?.data?.data?.products),
    setIsLoading(false)
  }
  async function updateProduct(productId,count){
    let response= await updateCart(productId,count);
    console.log(response);
    setCartItems(response?.data?.data?.products),
    setIsLoading(false)
  }

  async function removeCartProducts(){
    let response= await removeAllCart();
    console.log(response);
    setCartItems(response?.data?.data?.products),
    setIsLoading(false)
  }


  useEffect(() => {
    getAllCart()
  }, [])
  
  return (
    <>
      
<div className='my-20'>
{isLoading? <Loader/> : <div className="relative overflow-x-auto  container shadow-md sm:rounded-lg">
  <div className="text-end">
    <button onClick={()=>removeCartProducts()} className='bg-red-600 text-white rounded py-3 my-3'>ClearCart</button>
  </div>
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-16 py-3">
          <span className="sr-only">Image</span>
        </th>
        <th scope="col" className="px-6 py-3">
          Product
        </th>
        <th scope="col" className="px-6 py-3">
          Qty
        </th>
        <th scope="col" className="px-6 py-3">
          Unit Price
        </th>
        <th scope="col" className="px-6 py-3">
          Total Price
        </th>
        <th scope="col" className="px-6 py-3">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
      {cartItems?.map((item)=><tr key={item.product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="p-4">
          <img src={item.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          {item.product.title}
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center">
            <button onClick={()=>updateProduct(item.product.id, item.count-1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
              </svg>
            </button>
            <div>
              <span>{item.count}</span>
            </div>
            <button onClick={()=>updateProduct(item.product.id, item.count+1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
              </svg>
            </button>
          </div>
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          {item.price} EGP
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          {item.price * item.count} EGP
        </td>
        <td className="px-6 py-4">
          <button onClick={()=>removeProduct(item.product.id)} className=" btn font-medium text-red-600 dark:text-red-500 hover:underline">Remove</button>
        </td>
      </tr>)}
      <tr className="bg-white border-b text-center font-bold text-black text-xl dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
       <td className='text-center' colSpan={5}>Total Price</td>
       <td className='text-center'> {totalCartPrice} EGP</td>
       <td className='text-center'><Link className='px-3 py-2 mb-4 bg-cyan-500 text-white rounded' to="/checkout">Checkout</Link></td>
      </tr>
    </tbody>
  </table>
</div>}


</div>

    </>
  )
}
