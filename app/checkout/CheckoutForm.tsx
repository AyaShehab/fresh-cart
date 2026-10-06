'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Home,
  Info,
  Building2,
  MapPin,
  Phone,
  Wallet,
  Banknote,
  CreditCard,
  ShieldCheck,
  Check,
  Mail,
  Loader2,
} from 'lucide-react'
import SectionHeader from './SectionHeader'
import { useForm } from 'react-hook-form'
import { payCash } from '@/Api/Actions/payment/payCash.action'

import { toast } from '@/components/ui/toast'
import { payOnline } from '@/Api/Actions/payment/payOnline'

type PaymentMethod = 'cash' | 'online'

export interface ShippingData {
  details: string
  phone: string
  city: string
  postalCode: string
}

const inputBase =
  'w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-14 pr-4 text-sm text-slate-800 placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition'

export default function CheckoutForm({ cartId }: { cartId: string }) {
  const router = useRouter()
  const [payment, setPayment] = useState<PaymentMethod>('cash')
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingData>({
    defaultValues: {
      details: '',
      phone: '',
      city: '',
      postalCode: '',
    },
  })

  async function handleSubmitCheckout(data: ShippingData) {
    setIsLoading(true)
    try {
      if (payment === 'cash') {
        const response = await payCash(cartId, data)
        if (response?.status === 'success') {
          toast.add({
            type: 'success',
            description: 'Order placed successfully!',
            priority: 'high',
          })
          router.push('/')
        } else {
          toast.add({
            type: 'error',
            description: response?.message || 'Failed to place cash order',
            priority: 'high',
          })
        }
      } else {
        const response = await payOnline(cartId, data)
        if (response?.status === 'success' && response?.session?.url) {
          toast.add({
            type: 'info',
            description: 'Redirecting to payment gateway...',
            priority: 'high',
          })
          window.location.href = response.session.url
        } else {
          toast.add({
            type: 'error',
            description: response?.message || 'Failed to initialize online payment',
            priority: 'high',
          })
        }
      }
    } catch (error) {
      toast.add({
        type: 'error',
        description: 'Failed to place order. Please try again.',
        priority: 'high',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const isCash = payment === 'cash'

  return (
    <form
      id="checkout-form"
      onSubmit={handleSubmit(handleSubmitCheckout)}
      className="flex flex-col gap-6"
    >
      {/* ---------- Shipping Address ---------- */}
      <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <SectionHeader
          icon={Home}
          title="Shipping Address"
          subtitle="Where should we deliver your order?"
        />

        <div className="p-6 flex flex-col gap-6">
          <div className="flex items-center gap-3 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3.5">
            <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <Info className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-blue-700">Delivery Information</p>
              <p className="text-xs text-blue-600">
                Please ensure your address is accurate for smooth delivery
              </p>
            </div>
          </div>

          {/* City */}
          <div>
            <label htmlFor="city" className="block text-sm font-semibold text-slate-800 mb-2">
              City <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                <Building2 className="w-4 h-4 text-gray-500" />
              </span>
              <input
                id="city"
                type="text"
                placeholder="e.g. Cairo, Alexandria, Giza"
                className={inputBase}
                {...register('city', { required: 'City is required' })}
              />
            </div>
            {errors.city && (
              <p className="text-xs text-red-500 mt-1">{errors.city.message}</p>
            )}
          </div>

          {/* Postal Code */}
          <div>
            <label htmlFor="postalCode" className="block text-sm font-semibold text-slate-800 mb-2">
              Postal Code <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                <Mail className="w-4 h-4 text-gray-500" />
              </span>
              <input
                id="postalCode"
                type="text"
                placeholder="e.g. 11511"
                className={inputBase}
                {...register('postalCode', { required: 'Postal code is required' })}
              />
            </div>
            {errors.postalCode && (
              <p className="text-xs text-red-500 mt-1">{errors.postalCode.message}</p>
            )}
          </div>

          {/* Details */}
          <div>
            <label htmlFor="details" className="block text-sm font-semibold text-slate-800 mb-2">
              Street Address / Details <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3.5 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                <MapPin className="w-4 h-4 text-gray-500" />
              </span>
              <textarea
                id="details"
                rows={3}
                placeholder="Street name, building number, floor, apartment..."
                className={`${inputBase} resize-none`}
                {...register('details', { required: 'Address details are required' })}
              />
            </div>
            {errors.details && (
              <p className="text-xs text-red-500 mt-1">{errors.details.message}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-semibold text-slate-800 mb-2">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                <Phone className="w-4 h-4 text-gray-500" />
              </span>
              <input
                id="phone"
                type="tel"
                placeholder="01xxxxxxxxx"
                className={`${inputBase} pr-36`}
                {...register('phone', {
                  required: 'Phone number is required',
                  pattern: {
                    value: /^01[0125][0-9]{8}$/,
                    message: 'Enter a valid Egyptian phone number',
                  },
                })}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                Egyptian numbers only
              </span>
            </div>
            {errors.phone && (
              <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>
            )}
          </div>
        </div>
      </section>

      {/* ---------- Payment Method ---------- */}
      <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <SectionHeader
          icon={Wallet}
          title="Payment Method"
          subtitle="Choose how you'd like to pay"
        />

        <div className="p-6 flex flex-col gap-4">
          <button
            type="button"
            onClick={() => setPayment('cash')}
            aria-pressed={isCash}
            className={`flex items-center gap-4 rounded-2xl border-2 p-5 text-left transition ${
              isCash ? 'border-green-500 bg-green-50/70' : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div
              className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${
                isCash
                  ? 'bg-gradient-to-br from-green-500 to-green-600 shadow-md shadow-green-600/20'
                  : 'bg-gray-100'
              }`}
            >
              <Banknote className={`w-6 h-6 ${isCash ? 'text-white' : 'text-gray-500'}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className={`font-bold ${isCash ? 'text-green-800' : 'text-slate-900'}`}>
                Cash on Delivery
              </p>
              <p className="text-sm text-gray-600">Pay when your order arrives at your doorstep</p>
            </div>
            {isCash ? (
              <span className="w-7 h-7 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-white" />
              </span>
            ) : (
              <span className="w-7 h-7 rounded-full border-2 border-gray-300 flex-shrink-0" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setPayment('online')}
            aria-pressed={!isCash}
            className={`flex items-center gap-4 rounded-2xl border-2 p-5 text-left transition ${
              !isCash ? 'border-green-500 bg-green-50/70' : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div
              className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${
                !isCash
                  ? 'bg-gradient-to-br from-green-500 to-green-600 shadow-md shadow-green-600/20'
                  : 'bg-gray-100'
              }`}
            >
              <CreditCard className={`w-6 h-6 ${!isCash ? 'text-white' : 'text-gray-500'}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className={`font-bold ${!isCash ? 'text-green-800' : 'text-slate-900'}`}>
                Pay Online
              </p>
              <p className="text-sm text-gray-600">
                Secure payment with Credit/Debit Card via Stripe
              </p>
            </div>
            {!isCash ? (
              <span className="w-7 h-7 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-white" />
              </span>
            ) : (
              <span className="w-7 h-7 rounded-full border-2 border-gray-300 flex-shrink-0" />
            )}
          </button>

          <div className="flex items-center gap-3 rounded-xl border border-green-100 bg-green-50 px-4 py-3.5">
            <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800">Secure &amp; Encrypted</p>
              <p className="text-xs text-green-600">
                Your payment info is protected with 256-bit SSL encryption
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Processing...
          </>
        ) : isCash ? (
          'Place Cash Order'
        ) : (
          'Proceed to Online Payment'
        )}
      </button>
    </form>
  )
}