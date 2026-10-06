'use client';

import React from 'react';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import ProductCard from '../_components/ProductCard/ProductCard';
import { useWishlist } from '../_components/WishlistContext/WishlistContext';

export default function WishlistPage() {
  const { wishlistItems, isLoading } = useWishlist();

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-500 font-medium">Loading your wishlist...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50/40 min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-7xl">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-6 flex items-center gap-3">
          <Heart className="w-8 h-8 text-red-500 fill-red-500" />
          My Wishlist
        </h1>

        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlistItems.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 max-w-lg mx-auto my-12">
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Your Wishlist is Empty</h3>
            <p className="text-gray-500 text-sm mb-6">
              Explore products and save your favorite items to view them here later.
            </p>
            <Link
              href="/products"
              className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-6 py-3 rounded-2xl transition shadow-md shadow-emerald-600/20"
            >
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}