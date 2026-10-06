import { Category, ProductType } from "../types/interfaces/product";

export async function getShopCategories():Promise<Category[]>{
try{
        const response = await fetch('https://ecommerce.routemisr.com/api/v1/categories')
        if(!response.ok) throw new Error('Api Error')
        const payload = await response.json()
    return payload.data??[];

}    
catch(error){
throw new Error('Api Error')
}
}

export async function getProductsByCategory(categoryId: string): Promise<ProductType[]> {
  try {
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}`);
    if (!response.ok) {
      throw new Error('Api Error');
    }
    const payload = await response.json();
    return payload.data;
  } catch (error) {
    throw new Error('Api Error');
  }
}