'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  ShoppingCart,
  ShoppingBag,
  Minus,
  Plus,
  Trash2,
  Truck,
  Tag,
  Lock,
  ShieldCheck,
  ArrowLeft,
  Check,
} from 'lucide-react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { CartREsponseType } from '@/Api/types/cartType'
import { deleteCartItem } from '@/Api/Actions/cartActions/deleteCartItem'
import { deleteCart } from '@/Api/Actions/cartActions/deleteCart'
import { updateCart } from '@/Api/Actions/cartActions/updateCartItem'
import { applyCoupon } from '@/Api/Actions/cartActions/applyCoponToCart'
import { toast } from '@/components/ui/toast'
import EmptyCart from '../EmptyCart/EmptyCart'

export default function CartComponent() {
  const query = useQueryClient()

  const [couponCode, setCouponCode] = useState('')
  const [showCoupon, setShowCoupon] = useState(false)

  // ---------- حذف منتج ----------
  const { mutate: delCartItem, isPending: isDeletingItem } = useMutation({
    mutationFn: deleteCartItem,
    onSuccess: (data) => {
      if (data?.success === false) {
        toast.add({ type: 'error', description: data.message ?? 'Failed', priority: 'high' })
        return
      }
      toast.add({ type: 'success', description: 'Product Deleted Successfully', priority: 'high' })
      query.invalidateQueries({ queryKey: ['getCart'] })
    },
    onError: () => {
      toast.add({ type: 'error', description: 'Failed', priority: 'high' })
    },
  })

  // ---------- مسح الكارت ----------
  const { mutate: delCart, isPending: isClearing } = useMutation({
    mutationFn: deleteCart,
    onSuccess: (data) => {
      if (data?.success === false) {
        toast.add({ type: 'error', description: data.message ?? 'Failed', priority: 'high' })
        return
      }
      toast.add({ type: 'success', description: 'Cart Deleted Successfully', priority: 'high' })
      query.invalidateQueries({ queryKey: ['getCart'] })
    },
    onError: () => {
      toast.add({ type: 'error', description: 'Failed', priority: 'high' })
    },
  })

  const { mutate: putCart, isPending: isUpdating } = useMutation({
    mutationFn: updateCart,
    onSuccess: (data) => {
      if (data?.success === false) {
        toast.add({ type: 'error', description: data.message ?? 'Failed', priority: 'high' })
        return
      }
      toast.add({ type: 'success', description: 'Cart Updated Successfully', priority: 'high' })
      query.invalidateQueries({ queryKey: ['getCart'] })
    },
    onError: () => {
      toast.add({ type: 'error', description: 'Failed', priority: 'high' })
    },
  })

  const { mutate: putCoupon, isPending: isApplying } = useMutation({
    mutationFn: applyCoupon,
    onSuccess: (data) => {
      if (data?.success === false) {
        toast.add({ type: 'error', description: data.message ?? 'Invalid coupon', priority: 'high' })
        return
      }
      toast.add({ type: 'success', description: 'Coupon Added Successfully', priority: 'high' })
      setCouponCode('')
      query.invalidateQueries({ queryKey: ['getCart'] })
    },
    onError: () => {
      toast.add({ type: 'error', description: 'Failed', priority: 'high' })
    },
  })

  function handleUpdateCart(prodId: string, count: number) {
    putCart({ prodId, count })
  }

  function handleApplyCoupon() {
    const code = couponCode.trim()
    if (!code) return
    putCoupon(code)
  }

  const { data: cartData, isLoading } = useQuery<CartREsponseType>({
    queryKey: ['getCart'],
    queryFn: async () => {
      const response = await fetch('/api/cart')
      if (!response.ok) throw new Error('Faild to fetch')
      return response.json()
    },
  })

  const products = cartData?.data?.products ?? []
  const itemsCount = cartData?.numOfCartItems ?? 0
  const subtotal = cartData?.data?.totalCartPrice ?? 0

  const discounted = (cartData?.data as { totalAfterDiscount?: number } | undefined)
    ?.totalAfterDiscount
  const hasDiscount = discounted !== undefined && discounted < subtotal
  const finalSubtotal = hasDiscount ? discounted : subtotal

  const shipping = finalSubtotal > 0 && finalSubtotal < 500 ? 50 : 0
  const total = finalSubtotal + shipping
  const remaining = Math.max(0, 500 - finalSubtotal)
  const progress = Math.min(100, Math.round((finalSubtotal / 500) * 100))

  if (isLoading) {
    return (
      <main className="bg-slate-50/60 min-h-screen flex items-center justify-center">
        <p className="text-gray-400">Loading your cart...</p>
      </main>
    )
  }

  if (products.length === 0) {
    return <EmptyCart />
  }

  return (
    <main className="bg-slate-50/60 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-4">
          <Link href="/" className="hover:text-emerald-600 transition">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-900 font-medium">Shopping Cart</span>
        </nav>

        {/* Page header */}
        <div className="flex items-center gap-4 mb-2">
          <div className="w-14 h-14 rounded-xl bg-green-600 flex items-center justify-center shadow-sm">
            <ShoppingCart className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Shopping Cart</h1>
        </div>
        <p className="text-gray-500 mb-8">
          You have <span className="font-semibold text-green-600">{itemsCount} items</span> in your cart
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* ============ Items list ============ */}
          <div className="lg:col-span-8">
            <div className="flex flex-col gap-4">
              {products.map((item) => (
                <article
                  key={item._id}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex gap-5"
                >
                  {/* Image + stock badge */}
                  <div className="relative flex-shrink-0 pb-3">
                    <div className="w-32 h-32 rounded-xl border border-gray-100 bg-gray-50 flex items-center justify-center overflow-hidden">
                      <Image
                        src={item.product.imageCover}
                        alt={item.product.title}
                        width={128}
                        height={128}
                        className="w-full h-full object-contain p-2"
                      />
                    </div>
                    <span className="absolute -bottom-0 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 bg-green-500 text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full whitespace-nowrap">
                      <Check className="w-3 h-3" />
                      In Stock
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 mb-2">{item.product.title}</h2>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="bg-green-50 text-green-700 text-xs font-medium px-3 py-1 rounded-full">
                          {item.product.category.name}
                        </span>
                        <span className="text-gray-300">•</span>
                        <span className="text-xs text-gray-500">
                          SKU: {item.product._id.slice(-6).toUpperCase()}
                        </span>
                      </div>
                      <p>
                        <span className="text-lg font-bold text-green-600">{item.price} EGP</span>
                        <span className="text-xs text-gray-400 ml-2">per unit</span>
                      </p>
                    </div>

                    <div className="flex items-end justify-between mt-4">
                      {/* Quantity stepper */}
                      <div className="inline-flex items-center border border-gray-200 rounded-xl p-1 bg-gray-50">
                        <button
                          onClick={() => handleUpdateCart(item.product._id, item.count - 1)}
                          disabled={item.count <= 1 || isUpdating}
                          type="button"
                          className="w-9 h-9 flex items-center justify-center text-gray-400 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed"
                          aria-label="Decrease"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-10 text-center font-bold text-slate-900">{item.count}</span>
                        <button
                          onClick={() => handleUpdateCart(item.product._id, item.count + 1)}
                          disabled={item.count >= item.product.quantity || isUpdating}
                          type="button"
                          className="w-9 h-9 flex items-center justify-center bg-green-600 hover:bg-green-700 text-white rounded-lg transition disabled:opacity-40 disabled:cursor-not-allowed"
                          aria-label="Increase"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Total + delete */}
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-xs text-gray-400">Total</p>
                          <p>
                            <span className="text-xl font-extrabold text-slate-900">
                              {item.price * item.count}
                            </span>
                            <span className="text-sm text-gray-400 ml-1">EGP</span>
                          </p>
                        </div>
                        <button
                          onClick={() => delCartItem(item.product._id)}
                          disabled={isDeletingItem}
                          type="button"
                          aria-label="Remove item"
                          className="w-10 h-10 flex items-center justify-center rounded-xl bg-red-50 hover:bg-red-100 border border-red-100 text-red-500 transition disabled:opacity-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Footer actions */}
            <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium text-sm transition"
              >
                <ArrowLeft className="w-4 h-4" />
                Continue Shopping
              </Link>
              <button
                onClick={() => delCart()}
                disabled={isClearing}
                type="button"
                className="inline-flex items-center gap-2 text-gray-500 hover:text-red-500 text-sm transition disabled:opacity-50"
              >
                <Trash2 className="w-4 h-4" />
                Clear all items
              </button>
            </div>
          </div>

          {/* ============ Order summary ============ */}
          <aside className="lg:col-span-4 lg:sticky lg:top-28">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-5">
                <div className="flex items-center gap-2 mb-1">
                  <ShoppingBag className="w-5 h-5" />
                  <h2 className="text-lg font-bold">Order Summary</h2>
                </div>
                <p className="text-sm text-green-50">{itemsCount} items in your cart</p>
              </div>

              <div className="p-6">
                {/* Free shipping progress */}
                <div className="bg-amber-50 rounded-xl p-4 mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Truck className="w-5 h-5 text-orange-500" />
                    <p className="text-sm font-medium text-slate-800">
                      {remaining > 0 ? `Add ${remaining} EGP for free shipping` : 'You got free shipping!'}
                    </p>
                  </div>
                  <div className="h-2 rounded-full bg-orange-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-orange-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Totals */}
                <dl className="space-y-3 text-slate-600">
                  <div className="flex items-center justify-between">
                    <dt>Subtotal</dt>
                    <dd className="font-medium text-slate-800">{subtotal} EGP</dd>
                  </div>
                  {hasDiscount && (
                    <div className="flex items-center justify-between text-green-600">
                      <dt>Discount</dt>
                      <dd className="font-medium">-{subtotal - discounted} EGP</dd>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <dt>Shipping</dt>
                    <dd className="font-medium text-slate-800">
                      {shipping === 0 ? 'Free' : `${shipping} EGP`}
                    </dd>
                  </div>
                </dl>

                <div className="border-t border-dashed border-gray-200 my-5" />

                <div className="flex items-center justify-between mb-6">
                  <span className="font-semibold text-slate-900">Total</span>
                  <span>
                    <span className="text-3xl font-extrabold text-slate-900">{total}</span>
                    <span className="text-sm text-gray-400 ml-1">EGP</span>
                  </span>
                </div>

                {/* Promo */}
                {showCoupon ? (
                  <div className="flex gap-2 mb-4">
                    <input
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleApplyCoupon()}
                      placeholder="Enter promo code"
                      className="flex-1 min-w-0 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500"
                    />
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      disabled={isApplying || !couponCode.trim()}
                      className="px-5 rounded-xl bg-green-600 hover:bg-green-700 text-white text-sm font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Apply
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowCoupon(true)}
                    className="w-full flex items-center justify-center gap-2 border border-dashed border-gray-300 hover:border-green-500 hover:text-green-600 text-gray-500 rounded-xl py-3 text-sm font-medium transition mb-4"
                  >
                    <Tag className="w-4 h-4" />
                    Apply Promo Code
                  </button>
                )}

                {/* Checkout */}
                <Link href={`/checkout/${cartData?.cartId}`}>
                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-green-600/25 transition"
                >
                  <Lock className="w-4 h-4" />
                  Secure Checkout
                </button>
                </Link>

                <div className="flex items-center justify-center gap-6 mt-5 text-xs text-gray-500">
                  <span className="inline-flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
                    Secure Payment
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-blue-500" />
                    Fast Delivery
                  </span>
                </div>

                <Link
                  href="/products"
                  className="flex items-center justify-center gap-2 mt-6 text-sm text-green-600 hover:text-green-700 font-medium transition"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Continue Shopping
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}