import React, { useEffect, useState } from 'react'
import styles from "./FeatureBrands.module.css"
import axios from 'axios'
import Loader from '../Loader/Loader'





export default function FeatureBrands() {
  const [brands, setBrands] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  async function getBrands(){
    return await axios.get("https://ecommerce.routemisr.com/api/v1/brands").then((data)=>{
      console.log(data.data.data);
      setBrands(data.data.data),
      setIsLoading(false);
  
  
    }).catch((err)=>{
      console.log(err);
      
    })
  }
  useEffect(()=>{
    getBrands()
  },[])
   return (
      <div className='container mx-auto '>
        {isLoading ? <Loader/> :<div className='flex flex-wrap '>
         {brands.map((brand)=> <div key={brand._id} className='sm:w-full md:w-1/4 lg:w-1/6'>
         <div className="brand hover:border px-3 py-3">
         <img src={brand.image} className='w-[200px] h-[250px]' alt="" />
          <h3 className='text-green-400'>{brand.name}</h3>
          <div className='pt-3'>
          <p className='text-cyan-500'>Created at {brand.createdAt}</p>
          <p className='text-yellow-600 pt-2'>Updated at {brand.updatedAt}</p>
          </div>
          
         </div>
          </div>)}
        </div> }
        
      </div>
    )
  
  }
  