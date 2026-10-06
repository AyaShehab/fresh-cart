import React from 'react'
import ProductCard from '../ProductCard/ProductCard'
import { getAllProducts } from '@/Api/Services/productApi'
import { Link } from 'lucide-react'

export default async function FeaturedProducts() {
  const data = await getAllProducts()

  return (
    <section className="w-full py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-350">
        

      {/* Title with Green Bar */}
      <div className="flex items-center gap-3 mb-8">
        <span className="w-1.5 h-7 bg-emerald-600 rounded-full block"></span>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Featured Products
        </h2>
      </div>

      {/* Grid List */}
    
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
         {data.map((product)=>{return <ProductCard product={product} key={product._id}/>})}
     
        
      </div>
        </div>
    </section>
  )
}