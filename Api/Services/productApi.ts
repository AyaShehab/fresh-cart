import { ProductType } from "../types/interfaces/product"

export async function getAllProducts():Promise<ProductType[]>{
   try{
     const response = await fetch('https://ecommerce.routemisr.com/api/v1/products')
     if(!response.ok){
      throw new Error('Api Error')
     }
    const payload = await response.json()
    return payload.data
   }
   catch(error){
    throw new Error('Api Error')
   }
}


 export   async function getSingleProduct(prodId:string): Promise<ProductType> {
        try {
            const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${prodId}`);
        if(!response.ok){
      throw new Error('Api Error')
     }
    const payload = await response.json()
    return payload.data
   }
   catch(error){
    throw new Error('Api Error')
   }
    }