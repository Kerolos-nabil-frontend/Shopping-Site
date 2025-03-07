import React from 'react'
import styles from "./NotFound.module.css"
import NotFoundPic from "./../../assets/err 404.png"

export default function NotFound() {
  return (
    <div className='container mx-auto'>
      <img className='w-full' src={NotFoundPic} alt=''></img>
    </div>
  )
}
