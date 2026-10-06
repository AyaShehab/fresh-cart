import { ShoppingBag, ShieldCheck, Truck, RotateCcw, Package } from 'lucide-react'
import SectionHeader from '../SectionHeader'
import CheckoutForm from '../CheckoutForm'
import { getCart } from '@/Api/Actions/cartActions/getCart' // استدعاء الأكشن الخاص بجلب العربة
import Image from 'next/image'

type Props = {
  params: Promise<{
    cartId: string
  }>
}

export default async function CheckoutPage(props: Props) {
  const params = await props.params
  const { cartId } = params

  const cartRes = await getCart()
  const cartData = cartRes?.data

  const items = cartData?.products || []
  const numOfItems = cartRes?.numOfCartItems || 0
  const totalCartPrice = cartData?.totalCartPrice || 0

  return (
    <main className="bg-slate-50/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* ============ Left column: الفورم (Client Component) ============ */}
          <div className="lg:col-span-8">
            <CheckoutForm cartId={cartId} />
          </div>

          {/* ============ Order summary (Server) ============ */}
          <aside className="lg:col-span-4 lg:sticky lg:top-28">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <SectionHeader
                icon={ShoppingBag}
                title="Order Summary"
                subtitle={`${numOfItems} items`}
              />

              <div className="p-5">
                {/* Items list */}
                <div className="flex flex-col gap-3 max-h-60 overflow-y-auto pr-1">
                  {items.map((item: any) => (
                    <div key={item._id} className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
                      <div className="w-14 h-14 rounded-lg border border-gray-100 bg-white flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                        {item.product?.imageCover ? (
                          <Image
                            src={item.product.imageCover}
                            alt={item.product.title || 'Product Image'}
                            fill
                            className="object-contain p-1"
                          />
                        ) : (
                          <Package className="w-6 h-6 text-gray-300" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-900 truncate">
                          {item.product?.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          {item.count} × {item.price} EGP
                        </p>
                      </div>
                      <p className="text-sm font-bold text-slate-900">
                        {item.count * item.price} EGP
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-100 mt-5 pt-5">
                  <dl className="space-y-3">
                    <div className="flex items-center justify-between text-slate-600">
                      <dt>Subtotal</dt>
                      <dd className="font-medium text-slate-800">{totalCartPrice} EGP</dd>
                    </div>
                    <div className="flex items-center justify-between text-slate-600">
                      <dt className="inline-flex items-center gap-2">
                        <Truck className="w-4 h-4 text-gray-500" />
                        Shipping
                      </dt>
                      <dd className="font-bold text-green-600">FREE</dd>
                    </div>
                  </dl>
                </div>

                <div className="border-t border-gray-100 mt-4 pt-4 flex items-center justify-between">
                  <span className="font-bold text-slate-900">Total</span>
                  <span>
                    <span className="text-3xl font-extrabold text-green-600">
                      {totalCartPrice}
                    </span>
                    <span className="text-sm text-gray-400 ml-1">EGP</span>
                  </span>
                </div>

                {/* الزرار يرسل الفورم بالـ ID */}
                <button
                  type="submit"
                  form="checkout-form"
                  className="w-full mt-5 flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-green-600/25 transition"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Place Order
                </button>

                <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-center gap-4 text-xs text-gray-500">
                  <span className="inline-flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
                    Secure
                  </span>
                  <span className="h-4 w-px bg-gray-200" />
                  <span className="inline-flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-blue-500" />
                    Fast Delivery
                  </span>
                  <span className="h-4 w-px bg-gray-200" />
                  <span className="inline-flex items-center gap-1.5">
                    <RotateCcw className="w-3.5 h-3.5 text-orange-500" />
                    Easy Returns
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}