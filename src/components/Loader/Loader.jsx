import React from 'react'
import styles from "./Loader.module.css"
import { MoonLoader } from 'react-spinners'

export default function Loader() {
  return (
    <div className='h-screen flex align-center items-center'>
      <MoonLoader/>
    </div>
  )
}
