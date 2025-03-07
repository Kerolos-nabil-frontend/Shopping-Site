import React, { useEffect, useState } from 'react'
import styles from "./CategorySlider.module.css"
import axios from 'axios'
import Loader from '../Loader/Loader'
import Slider from 'react-slick'
import { useQuery } from '@tanstack/react-query'

export default function CategorySlider() {
  var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 3,
        arrows:false,
        adaptiveHeight:true,
        rtl:true,
        variableWidth:false,
        vertical:false,
        autoplay:true
      };
function getCategorySlider(){
  return axios.get("https://ecommerce.routemisr.com/api/v1/categories")
}
  let {data}= useQuery({
    queryKey:["categorySlider"],
    queryFn:getCategorySlider
  })
console.log(data?.data?.data);



  return (
    <>
      <div className="container mx-auto my-10">
        <h1 className='font-bold mb-5'>Show Popular Categories:</h1>

      <Slider {...settings}>

{data?.data?.data.map((cat)=> <div key={cat._id} className='text-center'>
<img src={cat.image} alt="" className='h-[200px]' />
<p>{cat.name}</p>

</div>)}
</Slider>
      </div>
    </>
  )
}
