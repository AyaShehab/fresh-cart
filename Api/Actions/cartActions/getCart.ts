

import { cookies } from 'next/headers'
import { decode } from 'next-auth/jwt'
import { getTokenFun } from '@/utilities/getTokenData'

export async function getCart(){
const token = await getTokenFun()
if(!token){
        throw new Error('Unauthorized')
}
try{
    const response = await fetch('https://ecommerce.routemisr.com/api/v2/cart',{
    method:'GET',
   
    headers :{
        token : token,
        'Content-type':'application/json'
    }
})
if(!response.ok){
    throw new Error('Unauthorized')
}
const payload = await response.json()
return payload
}
catch(error){
throw new Error('Unauthorized')
}
}