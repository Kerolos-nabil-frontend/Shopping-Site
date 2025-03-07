import React, { useEffect, useState } from 'react'
import styles from "./FeatureCategories.module.css"
import axios from 'axios'
import Loader from '../Loader/Loader'


export default function FeatureCategories() {
const [categories, setCategories] = useState([])
const [isLoading, setIsLoading] = useState(true)
async function getCategories(){
  return await axios.get("https://ecommerce.routemisr.com/api/v1/categories").then((data)=>{
    console.log(data.data.data);
    setCategories(data.data.data),
    setIsLoading(false);


  }).catch((err)=>{
    console.log(err);
    
  })
}
useEffect(()=>{
  getCategories()
},[])
 return (
    <div className='container mx-auto '>
      {isLoading ? <Loader/> :<div className='flex flex-wrap '>
       {categories.map((category)=> <div key={category._id} className='sm:w-full md:w-1/4 lg:w-1/6'>
       <div className="category hover:border px-3 py-3">
       <img src={category.image} className='w-[200px] h-[250px]' alt="" />
        <h3 className='text-green-400'>{category.name}</h3>
        <div className="py-2"></div>
        <p className='text-cyan-500'>Created at {category.createdAt}</p>
          <p className='text-yellow-600 pt-2'>Updated at {category.updatedAt}</p>
       </div>
        </div>)}
      </div> }
      
    </div>
  )

}
