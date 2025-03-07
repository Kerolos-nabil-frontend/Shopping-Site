import axios from "axios";
import { Toast } from "flowbite-react";
import { createContext, useState } from "react";
import toast from "react-hot-toast";

export let cartContext= createContext();

export default function CartContextProvider(props){
    const [noOfCartItems, setNoOfCartItems] = useState(0)
    const [totalCartPrice, setTotalCartPrice] = useState(0)

async function addToCart(productId){

let headers= {
    token: localStorage.getItem("userToken")
}
return axios.post("https://ecommerce.routemisr.com/api/v1/cart",{
    productId
},{
    headers
       
    
}).then((response)=>{
    console.log(response.data.data);
    setTotalCartPrice(response.data.data.totalCartPrice)
    toast.success(response.data.message);
    setNoOfCartItems(response.data.noOfCartItems)
    return response

}).catch((error)=>{
   
    return error
})

}
async function getCart(){

let headers= {
    token: localStorage.getItem("userToken")
}
return axios.get("https://ecommerce.routemisr.com/api/v1/cart",
{
    headers
       
    
}).then((response)=>{
    setNoOfCartItems(response.data.noOfCartItems)
    setTotalCartPrice(response.data.data.totalCartPrice)
    return response

}).catch((error)=>{
   
    return error
})

}
async function removeCartItem(productId){

    let headers= {
        token: localStorage.getItem("userToken")
    }
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`
     ,{
        headers
           
        
    }).then((response)=>{
        setNoOfCartItems(response.data.noOfCartItems)
        setTotalCartPrice(response.data.data.totalCartPrice)
        toast.success(response.data.message);
        return response
    
    }).catch((error)=>{
       
        return error
    })
    
    }
async function updateCart(productId,count){

    let headers= {
        token: localStorage.getItem("userToken")
    }
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
        count
    }
     ,{
        headers
           
        
    }).then((response)=>{
        setNoOfCartItems(response.data.noOfCartItems)
        setTotalCartPrice(response.data.data.totalCartPrice)
        toast.success(response.data.message);
        return response
    
    }).catch((error)=>{
       
        return error
    })
    
    }

    async function removeAllCart(productId){

        let headers= {
            token: localStorage.getItem("userToken")
        }
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`
         ,{
            headers
               
            
        }).then((response)=>{
            
            toast.success(response.data.message);
            setTotalCartPrice(response.data.data.totalCartPrice)
            return response
        
        }).catch((error)=>{
           
            return error
        })
        
        }
        async function onlinePayment(shippingAddress){

            let headers= {
                token: localStorage.getItem("userToken")
            }
            return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/67b210df429eb834606c7a30?url=http://localhost:5178`,{
                shippingAddress
            }
             ,{
                headers
                   
                
            }).then((response)=>{
               
               
                console.log(response.data.session);
                window.location.href= response.data.session.url
                return response
            
            }).catch((error)=>{
               
                return error
            })
            
            }
            
return <cartContext.Provider value={{addToCart, getCart, removeCartItem, updateCart,removeAllCart,noOfCartItems,totalCartPrice, onlinePayment}}>
    {props.children}
</cartContext.Provider>
}