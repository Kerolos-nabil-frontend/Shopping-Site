import React from 'react'
import styles from "./Home.module.css"
import FeatureProducts from '../FeatureProducts/FeatureProducts'
import MainSlider from '../MainSlider/MainSlider'
import CategorySlider from '../CategorySlider/CategorySlider'

export default function Home() {
  return (
    <div className='my-20'>
      <MainSlider/>
      <CategorySlider/>
      <FeatureProducts/>
    </div>
  )
}
