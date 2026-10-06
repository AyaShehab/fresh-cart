import React from 'react';
import { getProductsByCategory, getShopCategories } from '@/Api/Services/categoriesApi';
import ProductCard from '@/app/_components/ProductCard/ProductCard';
import { ProductType } from '@/Api/types/interfaces/product';
 

interface CategoryProductsPageProps {
  params: Promise<{ id: string }>;
}

export default async function CategoryProductsPage({ params }: CategoryProductsPageProps) {
  const { id } = await params;

  const [products, categories] = await Promise.all([
    getProductsByCategory(id),
    getShopCategories(),
  ]);

  const currentCategory = categories.find((cat) => cat._id === id);

  return (
    <section className="py-8 bg-gray-50/30 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
        
        {/* هيدر بنر أخضر باسم الكاتيجوري الحالي */}
        <div className="bg-emerald-600 rounded-3xl p-8 mb-8 text-white flex items-center justify-between shadow-lg shadow-emerald-600/10">
          <div>
            <h1 className="text-3xl font-extrabold mb-2">
              {currentCategory?.name || 'Category'}
            </h1>
            <p className="text-emerald-100 text-sm">
              Browse products in {currentCategory?.name || 'this category'}
            </p>
          </div>
        </div>

        {/* عرض شبكة المنتجات الخاصة بهذا القسم */}
        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product: ProductType) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 my-8">
            <p className="text-gray-500 font-medium text-base">
              No products found for this category.
            </p>
          </div>
        )}

      </div>
    </section>
  );
}


