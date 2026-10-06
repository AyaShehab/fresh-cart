
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
  ShoppingBag,
  Truck,
  RotateCcw,
  Headphones,
  Package,
} from 'lucide-react'

const items = [
  { id: 1, title: 'Woman Shawl', qty: 1, price: 149 },
  { id: 2, title: 'Woman Shawl', qty: 2, price: 149 },
  { id: 3, title: 'Woman Shawl', qty: 2, price: 149 },
  { id: 4, title: 'Woman Shawl', qty: 1, price: 149 },
]

const perks = [
  { icon: Truck, title: 'Free Shipping', text: 'On orders over 500 EGP' },
  { icon: RotateCcw, title: 'Easy Returns', text: '14-day return policy' },
  { icon: ShieldCheck, title: 'Secure Payment', text: '100% secure transactions' },
  { icon: Headphones, title: '24/7 Support', text: 'Dedicated support team' },
]

const inputBase =
  'w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-14 pr-4 text-sm text-slate-800 placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition'

function SectionHeader({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: React.ElementType
  title: string
  subtitle: string
}) {
  return (
    <div className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-5">
      <div className="flex items-center gap-2.5 mb-1">
        <Icon className="w-5 h-5" />
        <h2 className="text-lg font-bold">{title}</h2>
      </div>
      <p className="text-sm text-green-50">{subtitle}</p>
    </div>
  )
}

export default function CheckoutContent() {
  return (
    <main className="bg-slate-50/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* ============ Left column ============ */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* ---------- Shipping Address ---------- */}
            <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <SectionHeader
                icon={Home}
                title="Shipping Address"
                subtitle="Where should we deliver your order?"
              />

             
            </section>

            {/* ---------- Payment Method ---------- */}
            <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <SectionHeader
                icon={Wallet}
                title="Payment Method"
                subtitle="Choose how you'd like to pay"
              />

              <div className="p-6 flex flex-col gap-4">
                {/* Cash on Delivery (selected) */}
                <div className="flex items-center gap-4 rounded-2xl border-2 border-green-500 bg-green-50/70 p-5">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-md shadow-green-600/20 flex-shrink-0">
                    <Banknote className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-green-800">Cash on Delivery</p>
                    <p className="text-sm text-gray-600">Pay when your order arrives at your doorstep</p>
                  </div>
                  <span className="w-7 h-7 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-white" />
                  </span>
                </div>

                {/* Pay Online (not selected) */}
                <div className="flex items-center gap-4 rounded-2xl border-2 border-gray-200 bg-white p-5">
                  <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <CreditCard className="w-6 h-6 text-gray-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-900">Pay Online</p>
                    <p className="text-sm text-gray-600">
                      Secure payment with Credit/Debit Card via Stripe
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="rounded bg-blue-700 px-1.5 py-0.5 text-[9px] font-extrabold italic text-white leading-none">
                        VISA
                      </span>
                      <span className="relative inline-flex h-4 w-6 items-center">
                        <span className="absolute left-0 h-4 w-4 rounded-full bg-red-500" />
                        <span className="absolute right-0 h-4 w-4 rounded-full bg-orange-400/90" />
                      </span>
                      <span className="rounded bg-sky-500 px-1.5 py-0.5 text-[8px] font-extrabold text-white leading-none">
                        AMEX
                      </span>
                    </div>
                  </div>
                  <span className="w-7 h-7 rounded-full border-2 border-gray-300 flex-shrink-0" />
                </div>

                {/* Secure banner */}
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
          </div>

          {/* ============ Order summary ============ */}
          <aside className="lg:col-span-4 lg:sticky lg:top-28">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <SectionHeader icon={ShoppingBag} title="Order Summary" subtitle="6 items" />

              <div className="p-5">
                {/* Items list */}
                <div className="flex flex-col gap-3 max-h-60 overflow-y-auto pr-1">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 rounded-xl bg-gray-50 p-3"
                    >
                      <div className="w-14 h-14 rounded-lg border border-gray-100 bg-white flex items-center justify-center flex-shrink-0">
                        <Package className="w-6 h-6 text-gray-300" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-900 truncate">{item.title}</p>
                        <p className="text-xs text-gray-500">
                          {item.qty} × {item.price} EGP
                        </p>
                      </div>
                      <p className="text-sm font-bold text-slate-900">{item.qty * item.price}</p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-100 mt-5 pt-5">
                  <dl className="space-y-3">
                    <div className="flex items-center justify-between text-slate-600">
                      <dt>Subtotal</dt>
                      <dd className="font-medium text-slate-800">1,442 EGP</dd>
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
                    <span className="text-3xl font-extrabold text-green-600">1,442</span>
                    <span className="text-sm text-gray-400 ml-1">EGP</span>
                  </span>
                </div>

                <button
                  type="button"
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