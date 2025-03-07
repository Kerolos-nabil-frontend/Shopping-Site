import React, { useContext, useEffect, useState } from 'react'
import styles from "./ProductDetails.module.css"
import {Link, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Loader from '../Loader/Loader';
import Slider from 'react-slick';
import { cartContext } from '../Context/CartContext';


export default function ProductDetails() {
  let {id, category}= useParams();
  let {addToCart}= useContext(cartContext);
  
  async function addProductsToCart(productId) {
    let response = await addToCart(productId);
    console.log(response);
    
    
  }
  const [productDetails, setproductDetails] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([]);

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
    adaptiveHeight:true,
    rtl:true,
    variableWidth:false,
    vertical:false,
    autoplay:true
  };

 async function getProductDetails(){
return await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`).then((data)=>{
  setproductDetails(data.data.data)
  setIsLoading(false)
}).catch((error)=>{
  setErrorMessage(error.message)
  setIsLoading(false)
  console.log(error);
  
})
  }

  async function getRelatedProducts(){
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/products`).then((data)=>{
     
     let relateProducts= data.data.data,
     relatedProducts=relateProducts.filter((product)=>product.category.name == category)
     
     setRelatedProducts(relatedProducts)
    }).catch((error)=>{
      
      
    })
      }

  useEffect(() => {
    getProductDetails()
    getRelatedProducts()
  }, [])
  

 useEffect(() => {
  getProductDetails()
  getRelatedProducts()
 }, [id])
 


// let {data, isLoading, error}= useQuery({
//   queryKey:["productDetails"],
//   queryFn:getProductId
// })
// console.log(data);

  return (
    <>
      <div className="container mx-auto mt-20">
        {isLoading? <Loader/> : null}
        <div className='flex'>
          <div className='w-[200px] mr-5'>
          <Slider {...settings}>

     {productDetails?.images?.map((src)=> <img src={src} alt="" />)}
    </Slider>

          </div>
          <div className='w-3/4 mt-10'>
          <h1 className='text-black font-bolder text-2xl my-5'>{productDetails.title}</h1>
          <h3 className='text-gray-400 my-5'>{productDetails.description}</h3>
          <p className='my-5'>{productDetails.category?.name}</p>
          <div className="flex justify-between items-center pt-3">
          <div className='w-1/2'>{productDetails.price} EGP</div>
          <div className='w-1/2'><i className='fa fa-star text-yellow-300'></i>{productDetails.ratingsAverage}
          </div>
          
          <div>
          <button className='btn bg-green-700 w-full rounded-lg text-white px-2 py-3 '>Add To Cart</button>
        </div>
        </div>
          </div>
        </div>
      </div>

 <div className='container mx-auto '>
  <h1 className='font-bold text-gray-700 pt-10'>Related Products: </h1>
      {isLoading ? <Loader/> :<div className='flex flex-wrap '>
       {relatedProducts.map((product)=> <div key={product._id} className='sm:w-full md:w-1/4 lg:w-1/6'>
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
          <button onClick={()=>addProductsToCart(productDetails._id)} className='btn bg-green-700 w-[500px] rounded-lg text-white px-2 py-3 '>Add To Cart</button>
        </div>
       </div>
        </div>)}
      </div> }
      
    </div>

    </>
  )
}
