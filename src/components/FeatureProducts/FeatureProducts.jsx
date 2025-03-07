import React, { useContext, useEffect, useState } from 'react'
import styles from "./FeatureProducts.module.css"
import axios from 'axios';
import Loader from '../Loader/Loader';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { cartContext } from '../Context/CartContext';





export default function FeatureProducts() {
let {addToCart}= useContext(cartContext);

async function addProductsToCart(productId) {
  let response = await addToCart(productId);
  console.log(response);
  
  
}

// data is always undefined\\

// function getFeatureProducts(){
//   return axios.get("https://ecommerce.routemisr.com/api/v1/products")
// }
//  let {isLoading , isFetched}=  useQuery({
//     queryKey:["featureProducts"],
//     queryFn:getFeatureProducts
//   })
// console.log(isFetched);
// console.log(data?.data?.data);

  const [products, setproducts] = useState([])
const [isLoading, setIsLoading] = useState(true)
async function getProducts(){
  return await axios.get("https://ecommerce.routemisr.com/api/v1/products").then((data)=>{
    console.log(data.data.data);
    setproducts(data.data.data),
    setIsLoading(false);


  }).catch((err)=>{
    console.log(err);
    setIsLoading(false);
  })
}
useEffect(()=>{
  getProducts()
},[])
  return (
    <div className='container mx-auto '>
      {isLoading ? <Loader/> :<div className='flex flex-wrap '>
       {products.map((product)=> <div key={product._id} className='sm:w-full md:w-1/4 lg:w-1/6'>
       <div className="product hover:border px-3 py-3">

        <Link to={`/productdetails/${product.id}/${product.category.name}`}>
        
        <img src={product.imageCover} className='w-[200px] h-[250px]' alt="" />
        <h3 className='text-green-400'>{product.category.name}</h3>
        <p>{product.title.split(" ").slice(0,2).join(" ")}</p>
        <div className="flex justify-between align-center pt-3">
          <div>{product.price} EGP</div>
          <div><i className='fa fa-star text-yellow-300'></i>{product.ratingsAverage}</div>
        </div>
        
        </Link>
      


        <div>
          <button onClick={()=>addProductsToCart(product._id)} className='btn bg-green-700 w-full rounded-lg text-white px-2 py-3 translate-y-1 transition-opacity'>Add To Cart</button>
        </div>
       </div>
        </div>)}
      </div> }
      
    </div>
  )
}
