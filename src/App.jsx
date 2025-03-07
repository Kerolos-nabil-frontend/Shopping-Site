import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Products from './components/Products/Products'
import Cart from './components/Cart/Cart'
import Categories from './components/Categories/Categories'
import Brands from './components/Brands/Brands'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import NotFound from './components/NotFound/NotFound'
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes'
import ProtectedAuth from './components/ProtectedAuth/ProtectedAuth'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ProductDetails from './components/ProductDetails/ProductDetails'

import { Toaster } from 'react-hot-toast'
import AllOrders from './components/AllOrders/AllOrders'
import Checkout from './components/Checkout/Checkout'

export default function App() {

  const queryClient = new QueryClient()

let routes= createHashRouter([
  {path:"",element:<Layout/>, children:[
    {index:true, element:<Home/>},
    {path:"cart", element:<Cart/>},
    {path:"categories", element:<Categories/>},
    {path:"products", element:<Products/>},
    {path:"productdetails/:id/:category", element:<ProductDetails/>},
    {path:"brands", element:<Brands/>},
    {path:"checkout", element:<Checkout/>},
    {path:"login", element:<Login/>},
    {path:"register", element:<Register/>},
    {path:"allorders", element:<AllOrders/>},
    {path:"*", element:<NotFound/>},
  ]}
])
  return (
    <>
    <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={routes}></RouterProvider>
      <Toaster   position="top-right"
  reverseOrder={false}/>
      </QueryClientProvider>
      
    </>
  )
}
