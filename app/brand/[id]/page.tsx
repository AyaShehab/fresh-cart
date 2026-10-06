import React from 'react';
import { getBrands, getProductsByBrand } from '@/Api/Services/brandsApi';
import ProductCard from '@/app/_components/ProductCard/ProductCard';

interface BrandProductsPageProps {
  params: Promise<{ id: string }>;
}

export default async function BrandProductsPage({ params }: BrandProductsPageProps) {
  const { id } = await params;

  const [products, brands] = await Promise.all([
    getProductsByBrand(id),
    getBrands(),
  ]);

  const currentBrand = brands.find((b) => b._id === id);

  return (
    <section className="py-8 bg-gray-50/30 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
        
        <div className="bg-gradient-to-r from-purple-600 to-indigo-500 rounded-3xl p-8 mb-8 text-white flex items-center justify-between shadow-lg shadow-purple-500/10">
          <div>
            <h1 className="text-3xl font-extrabold mb-1">
              {currentBrand?.name || 'Brand Products'}
            </h1>
            <p className="text-purple-100 text-sm">
              Explore all products from {currentBrand?.name || 'this brand'}
            </p>
          </div>
        </div>

        
        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product: any) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 my-8">
            <p className="text-gray-500 font-medium">
              No products found for this brand.
            </p>
          </div>
        )}

      </div>
    </section>
  );
}