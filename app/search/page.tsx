'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Search as SearchIcon, X, LayoutGrid, List } from 'lucide-react';
import { getShopCategories } from '@/Api/Services/categoriesApi';
import { getBrands } from '@/Api/Services/brandsApi';
import { ProductType } from '@/Api/types/interfaces/product';
import { getAllProducts } from '@/Api/Services/productApi';
import ProductCard from '../_components/ProductCard/ProductCard';

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const router = useRouter();
  const resolvedSearchParams = use(searchParams);
  const initialQuery = resolvedSearchParams?.q || '';

  const [query, setQuery] = useState(initialQuery);
  const [allProducts, setAllProducts] = useState<ProductType[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const [prodsData, catsData, brandsData] = await Promise.all([
          getAllProducts(),
          getShopCategories(),
          getBrands(),
        ]);
        setAllProducts(prodsData || []);
        setCategories(catsData || []);
        setBrands(brandsData || []);
      } catch (err) {
        console.error('Error fetching search page data', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    let result = [...allProducts];

    if (initialQuery.trim()) {
      const qLower = initialQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title?.toLowerCase().includes(qLower) ||
          p.category?.name?.toLowerCase().includes(qLower) ||
          p.brand?.name?.toLowerCase().includes(qLower)
      );
    }

    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category?._id));
    }

    if (selectedBrands.length > 0) {
      result = result.filter((p) => selectedBrands.includes(p.brand?._id));
    }

    if (minPrice) {
      result = result.filter((p) => p.price >= Number(minPrice));
    }
    if (maxPrice) {
      result = result.filter((p) => p.price <= Number(maxPrice));
    }

    setFilteredProducts(result);
  }, [initialQuery, allProducts, selectedCategories, selectedBrands, minPrice, maxPrice]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const toggleCategory = (catId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(catId) ? prev.filter((id) => id !== catId) : [...prev, catId]
    );
  };

  const toggleBrand = (brandId: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brandId) ? prev.filter((id) => id !== brandId) : [...prev, brandId]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setMinPrice('');
    setMaxPrice('');
    router.push('/search');
  };

  return (
    <div className="bg-gray-50/40 min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
        
        {/* Breadcrumb */}
        <div className="text-xs text-gray-500 mb-6 flex items-center gap-1.5">
          <Link href="/" className="hover:text-emerald-600 transition">Home</Link>
          <span>/</span>
          <span className="font-semibold text-slate-700">Search Results</span>
        </div>

       
        <form onSubmit={handleSearchSubmit} className="mb-8">
          <div className="relative max-w-2xl bg-white rounded-2xl border border-gray-200 shadow-2xs overflow-hidden">
            <SearchIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="w-full py-4 pl-14 pr-6 text-slate-800 placeholder-gray-400 focus:outline-none text-base font-medium"
            />
          </div>
        </form>

       
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-1">
            Search Results for &quot;{initialQuery}&quot;
          </h1>
          <p className="text-sm text-gray-500">
            We found {filteredProducts.length} products for you
          </p>
        </div>

        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          
          <aside className="bg-white p-6 rounded-3xl border border-gray-100 shadow-2xs h-fit space-y-8">
            
            {/* Categories Filter */}
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-4">Categories</h3>
              <div className="space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                {categories.map((cat) => (
                  <label key={cat._id} className="flex items-center gap-3 text-sm text-slate-700 hover:text-emerald-600 cursor-pointer transition">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat._id)}
                      onChange={() => toggleCategory(cat._id)}
                      className="w-4 h-4 rounded-md border-gray-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>{cat.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Price Range Filter */}
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-4">Price Range</h3>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="text-[11px] font-medium text-gray-400 block mb-1">Min (EGP)</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-medium text-gray-400 block mb-1">Max (EGP)</label>
                  <input
                    type="number"
                    placeholder="No limit"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button type="button" onClick={() => { setMinPrice('0'); setMaxPrice('500'); }} className="py-1.5 px-2 bg-gray-50 hover:bg-emerald-50 hover:text-emerald-600 text-[11px] font-medium text-slate-600 rounded-lg transition border border-gray-100">Under 500</button>
                <button type="button" onClick={() => { setMinPrice('0'); setMaxPrice('1000'); }} className="py-1.5 px-2 bg-gray-50 hover:bg-emerald-50 hover:text-emerald-600 text-[11px] font-medium text-slate-600 rounded-lg transition border border-gray-100">Under 1K</button>
                <button type="button" onClick={() => { setMinPrice('0'); setMaxPrice('5000'); }} className="py-1.5 px-2 bg-gray-50 hover:bg-emerald-50 hover:text-emerald-600 text-[11px] font-medium text-slate-600 rounded-lg transition border border-gray-100">Under 5K</button>
                <button type="button" onClick={() => { setMinPrice('0'); setMaxPrice('10000'); }} className="py-1.5 px-2 bg-gray-50 hover:bg-emerald-50 hover:text-emerald-600 text-[11px] font-medium text-slate-600 rounded-lg transition border border-gray-100">Under 10K</button>
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Brands Filter */}
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-4">Brands</h3>
              <div className="space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                {brands.map((brand) => (
                  <label key={brand._id} className="flex items-center gap-3 text-sm text-slate-700 hover:text-emerald-600 cursor-pointer transition">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand._id)}
                      onChange={() => toggleBrand(brand._id)}
                      className="w-4 h-4 rounded-md border-gray-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>{brand.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              onClick={clearAllFilters}
              className="w-full py-2.5 bg-gray-50 hover:bg-gray-100 text-slate-700 text-xs font-bold rounded-xl border border-gray-200 transition"
            >
              Clear All Filters
            </button>
          </aside>

         
          <main className="lg:col-span-3">
            
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 bg-white p-4 rounded-2xl border border-gray-100">
              <div className="flex items-center gap-3">
                <button className="p-2 bg-emerald-600 text-white rounded-xl shadow-xs">
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-slate-700 transition">
                  <List className="w-4 h-4" />
                </button>

                {initialQuery && (
                  <div className="flex items-center gap-2 text-xs bg-gray-100 text-slate-700 px-3 py-1.5 rounded-lg ml-2">
                    <span>Active: &quot;{initialQuery}&quot;</span>
                    <button onClick={() => router.push('/search')} className="text-gray-400 hover:text-red-500">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">Sort by:</span>
                <select className="bg-white border border-gray-200 rounded-xl py-1.5 px-3 text-xs text-slate-700 font-medium focus:outline-none focus:border-emerald-500">
                  <option>Relevance</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>
            </div>

            {isLoading ? (
              <div className="py-20 text-center text-gray-400">Loading search results...</div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 my-4 flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400">
                  <SearchIcon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">No Products Found</h3>
                <p className="text-gray-500 text-sm max-w-md mb-6">
                  Try adjusting your search or filters to find what you&apos;re looking for.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-6 py-3 rounded-2xl transition shadow-md shadow-emerald-600/20"
                >
                  Clear Filters
                </button>
              </div>
            )}

          </main>
        </div>

      </div>
    </div>
  );
}