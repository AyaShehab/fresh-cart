import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getShopCategories } from '@/Api/Services/categoriesApi';


export  default async function Categories() {
   const categoriesData= await getShopCategories()
    return (
        <section className="py-10 bg-gray-50/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
                
                {/* Header Section */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <span className="w-1.5 h-7 bg-emerald-600 rounded-full" />
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
                            Shop By Category
                        </h2>
                    </div>

                    <Link 
                        href="/categories" 
                        className="flex items-center gap-1.5 text-emerald-600 hover:text-emerald-700 font-semibold text-sm sm:text-base group transition-colors"
                    >
                        <span>View All Categories</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
                    {categoriesData.map((category) => (
                        <Link 
                            key={category._id} 
                            href={`/categories/${category._id}`}
                            className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center text-center"
                        >
                            {/* Circle Image Wrapper */}
                            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden mb-4 bg-gray-50 group-hover:scale-105 transition-transform duration-300">
                                <Image
                                    src={category.image}
                                    alt={category.name}
                                    fill
                                    className="object-cover object-center"
                                />
                            </div>

                            {/* Category Title */}
                            <h3 className="text-sm font-bold text-slate-700 group-hover:text-emerald-600 transition-colors line-clamp-1">
                                {category.name}
                            </h3>
                        </Link>
                    ))}
                </div>

            </div>
        </section>
    );
}