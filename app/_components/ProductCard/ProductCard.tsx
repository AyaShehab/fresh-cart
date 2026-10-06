'use client';

import React from 'react';
import Image from 'next/image';
import { Heart, RefreshCw, Eye, Star, Plus } from 'lucide-react';
import { ProductType } from '@/Api/types/interfaces/product';
import Link from 'next/link';
import AddBtn from '../AddBtn/AddBtn';
import { useWishlist } from '../WishlistContext/WishlistContext';

export default function ProductCard({ product }: { product: ProductType }) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product._id);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => {
      const starValue = index + 1;
      if (rating >= starValue) {
        return (
          <Star key={index} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
        );
      } else if (rating >= starValue - 0.5) {
        return (
          <div key={index} className="relative w-3.5 h-3.5">
            <Star className="w-3.5 h-3.5 text-gray-300 absolute top-0 left-0" />
            <div className="overflow-hidden w-[50%] absolute top-0 left-0">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            </div>
          </div>
        );
      } else {
        return (
          <Star key={index} className="w-3.5 h-3.5 text-gray-300" />
        );
      }
    });
  };

  const hasDiscount = product.priceAfterDiscount && product.priceAfterDiscount < product.price;
  const discountPercentage = hasDiscount
    ? Math.round(((product.price - product.priceAfterDiscount!) / product.price) * 100)
    : 0;

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 p-4 relative hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
      
      {/* Upper Content */}
      <div>
        <div className="relative w-full h-48 rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center mb-4">
          
          {/* Discount Badge */}
          {hasDiscount && (
            <span className="absolute top-2 left-2 bg-red-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-md z-20 shadow-sm pointer-events-none">
              -{discountPercentage}%
            </span>
          )}

          <div className="absolute top-2 right-2 flex flex-col gap-1.5 z-30">
            <button 
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleWishlist(product._id);
              }}
              className={`w-7 h-7 rounded-full flex items-center justify-center shadow-sm border border-gray-100 transition cursor-pointer ${
                isWishlisted 
                  ? 'bg-red-50 text-red-500 border-red-200' 
                  : 'bg-white text-slate-600 hover:text-emerald-600'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-red-500' : ''}`} />
            </button>

            <button 
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              className="w-7 h-7 bg-white rounded-full flex items-center justify-center text-slate-600 hover:text-emerald-600 shadow-sm border border-gray-100 transition cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>

            <button 
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              className="w-7 h-7 bg-white rounded-full flex items-center justify-center text-slate-600 hover:text-emerald-600 shadow-sm border border-gray-100 transition cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
          </div>

          <Link href={`/productDetails/${product._id}`} className="w-full h-full flex items-center justify-center">
            <Image
              src={product.imageCover}
              alt={product.title || "Product Image"}
              width={200}
              height={200}
              className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
            />
          </Link>
        </div>

        {/* Product Details */}
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-medium text-gray-400">
            {product.category?.name}
          </span>
          <Link href={`/productDetails/${product._id}`}>
            <h3 className="text-sm font-semibold text-slate-800 line-clamp-1 hover:text-emerald-600 transition">
              {product.title}
            </h3>
          </Link>

          {/* Dynamic Stars Rating */}
          <div className="flex items-center gap-1 mt-1">
            <div className="flex items-center gap-0.5">
              {renderStars(product.ratingsAverage)}
            </div>
            <span className="text-xs text-gray-500 font-medium ml-1">
              {product.ratingsAverage}{" "}
              <span className="text-gray-400">({product.ratingsQuantity})</span>
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Section: Price & Add Button */}
      <div className="flex items-center justify-between mt-4 pt-2 border-t border-gray-50">
        <div className="flex items-baseline gap-1.5 flex-wrap">
          {hasDiscount ? (
            <>
              <span className="text-base font-bold text-emerald-600">
                {product.priceAfterDiscount} EGP
              </span>
              <span className="text-xs text-gray-400 line-through">
                {product.price} EGP
              </span>
            </>
          ) : (
            <span className="text-base font-bold text-slate-900">
              {product.price} EGP
            </span>
          )}
        </div>

        <AddBtn 
          prodId={product._id} 
          child={<Plus className="w-4 h-4 stroke-3" />} 
          cls={'w-8 h-8 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center transition shadow-sm shrink-0'}
        />
      </div>

    </div>
  );
}