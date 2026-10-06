import React from 'react';
import Image from 'next/image';
import { Star, ShoppingCart, Zap, Plus, Minus } from 'lucide-react';
import { ProductType } from '../../../Api/types/interfaces/product';
import { getSingleProduct } from '@/Api/Services/productApi';
import ProductGallery from '@/app/_components/ProductGallery/ProductGallery';
import AddBtn from '@/app/_components/AddBtn/AddBtn';

export default async function ProductDetails(props: { params: any; }) {
    const params = await props.params
    const { id } = params



    const data = await getSingleProduct(id);

    if (!data) {
        return <div className="text-center py-10">Product not found</div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

                {/* Left Column: Image Gallery */}
                <ProductGallery
                    imageCover={data.imageCover}
                    images={data.images}
                    title={data.title}
                />

                {/* Right Column: Product Details & Controls */}
                <div className="md:col-span-7 flex flex-col pt-2">

                    {/* Badges */}
                    <div className="flex items-center gap-2 mb-3">
                        {data.category?.name && (
                            <span className="bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full">
                                {data.category.name}
                            </span>
                        )}
                        {data.brand?.name && (
                            <span className="bg-gray-100 text-slate-700 text-xs font-semibold px-3 py-1 rounded-full">
                                {data.brand.name}
                            </span>
                        )}
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
                        {data.title}
                    </h1>

                    {/* Ratings */}
                    <div className="flex items-center gap-2 mb-4">
                        <div className="flex text-amber-400">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`w-4 h-4 ${i < Math.floor(data.ratingsAverage || 0) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`}
                                />
                            ))}
                        </div>
                        <span className="text-xs font-bold text-slate-800">{data.ratingsAverage}</span>
                        <span className="text-xs text-gray-500">({data.ratingsQuantity || 0} reviews)</span>
                    </div>

                    {/* Price */}
                    <div className="text-3xl font-extrabold text-slate-900 mb-4">
                        {data.price} EGP
                    </div>

                    {/* Stock Badge */}
                    <div className="mb-6">
                        <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-600 text-xs font-semibold px-3 py-1 rounded-full">
                            <span className="w-2 h-2 rounded-full bg-emerald-500" />
                            In Stock
                        </span>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-slate-600 mb-6 leading-relaxed">
                        {data.description}
                    </p>

                    {/* Quantity Selector */}
                    <div className="mb-6">
                        <label className="block text-xs font-semibold text-slate-700 mb-2">
                            Quantity
                        </label>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center border border-gray-200 rounded-lg p-1 bg-white">
                                <button className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-gray-100 rounded-md">
                                    <Minus className="w-3.5 h-3.5" />
                                </button>
                                <span className="w-10 text-center font-bold text-sm text-slate-800">
                                    1
                                </span>
                                <button className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-gray-100 rounded-md">
                                    <Plus className="w-3.5 h-3.5" />
                                </button>
                            </div>
                            <span className="text-xs text-gray-500 font-medium">
                                {data.quantity} available
                            </span>
                        </div>
                    </div>

                    {/* Total Price Bar */}
                    <div className="bg-slate-50/80 p-4 rounded-xl flex items-center justify-between mb-6">
                        <span className="text-sm font-semibold text-slate-600">Total Price:</span>
                        <span className="text-2xl font-black text-emerald-600">
                            {data.price}.00 EGP
                        </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* <button className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 px-6 rounded-xl font-bold text-sm shadow-sm">
                            <ShoppingCart className="w-4 h-4" />
                            <span>Add to Cart</span>
                        </button> */}
                        <AddBtn prodId={data._id} child={<>  <ShoppingCart className="w-4 h-4" />
                            <span>Add to Cart</span>
                        </>
                        } cls={'flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 px-6 rounded-xl font-bold text-sm shadow-sm'} />
                        <button className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white py-3.5 px-6 rounded-xl font-bold text-sm shadow-sm">
                            <Zap className="w-4 h-4 fill-white" />
                            <span>Buy Now</span>
                        </button>
                    </div>

                </div>

            </div>
        </div>
    );
}