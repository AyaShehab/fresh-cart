import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Tag } from 'lucide-react';
import { getBrands } from '@/Api/Services/brandsApi';

export default async function BrandsPage() {
  const brands = await getBrands();

  return (
    <section className="py-8 bg-gray-50/30 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
        
        {/* Breadcrumb */}
        <div className="text-xs text-gray-500 mb-4 flex items-center gap-1.5">
          <Link href="/" className="hover:text-emerald-600 transition">Home</Link>
          <span>/</span>
          <span className="font-semibold text-slate-700">Brands</span>
        </div>

     
        <div className="bg-gradient-to-r from-purple-600 to-indigo-500 rounded-3xl p-8 sm:p-10 mb-8 text-white flex items-center gap-6 shadow-lg shadow-purple-500/10">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
            <Tag className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold mb-1">Top Brands</h1>
            <p className="text-purple-100 text-sm">
              Shop from your favorite brands
            </p>
          </div>
        </div>

        {/* شبكة كروت الماركات */}
        {brands.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
            {brands.map((brand) => (
              <Link
                key={brand._id}
                href={`/brand/${brand._id}`}
                className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center text-center"
              >
                {/* صورة الماركة */}
                <div className="relative w-28 h-28 mb-3 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    fill
                    className="object-contain p-2"
                  />
                </div>

                {/* اسم الماركة */}
                <h3 className="text-xs font-bold text-slate-700 group-hover:text-purple-600 transition-colors">
                  {brand.name}
                </h3>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
            <p className="text-gray-500 font-medium">No brands found.</p>
          </div>
        )}

      </div>
    </section>
  );
}