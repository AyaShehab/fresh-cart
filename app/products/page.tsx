import React from 'react';
import { ProductType } from '../../Api/types/interfaces/product';
import { Heart, RefreshCw, Eye, Star, Plus } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default async function Products() {
  async function getProducts(): Promise<ProductType[] | null> {
    try {
      let response = await fetch(`https://ecommerce.routemisr.com/api/v1/products`,
        {
            cache:'no-store'
           
        }
      );
      let payload = await response.json();
      return payload.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  const data = await getProducts();

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8 font-sans">
      {/* Products Counter */}
      <div className="mb-6">
        <p className="text-sm font-medium text-gray-500">
          Showing <span className="text-gray-900 font-semibold">{data?.length || 0}</span> products
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5">
        {data?.map((prod) => (

          <div
            key={prod._id}
            className="group relative bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
          >
            <Link href={`/productDetails/${prod._id}`}>
            {/* Top Image & Floating Actions */}
            <div className="relative w-full aspect-square bg-gray-50 rounded-xl overflow-hidden mb-3 flex items-center justify-center">
              
              {/* Product Image Cover */}
              <Image
              width={200}
              height={200}
                src={prod.imageCover}
                alt={prod.title}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
              />

              {/* Side Floating Action Buttons */}
              <div className="absolute top-2 right-2 flex flex-col gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                <button className="w-7 h-7 bg-white rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 shadow-sm hover:shadow transition">
                  <Heart className="w-3.5 h-3.5" />
                </button>
                <button className="w-7 h-7 bg-white rounded-full flex items-center justify-center text-gray-400 hover:text-emerald-600 shadow-sm hover:shadow transition">
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
                <button className="w-7 h-7 bg-white rounded-full flex items-center justify-center text-gray-400 hover:text-emerald-600 shadow-sm hover:shadow transition">
                  <Eye className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                {/* Category Name */}
                <span className="text-xs text-gray-400 font-medium block mb-1">
                  {prod.category?.name}
                </span>

                {/* Title */}
                <h3 className="text-sm font-semibold text-gray-800 line-clamp-1 mb-2" title={prod.title}>
                  {prod.title}
                </h3>

                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-4">
                  <div className="flex text-amber-400 text-xs">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < Math.floor(prod.ratingsAverage)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-gray-200 fill-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-400 font-medium ml-1">
                    {prod.ratingsAverage} ({prod.ratingsQuantity})
                  </span>
                </div>
              </div>

              {/* Price & Add Button */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                <div className="flex items-baseline gap-1">
                  <span className="text-base font-bold text-gray-900">
                    {prod.price}
                  </span>
                  <span className="text-xs font-semibold text-gray-500">EGP</span>
                </div>

                <button className="w-8 h-8 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center transition-colors shadow-sm">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}