import Link from 'next/link';
import { Package, ArrowRight, Truck, ShieldCheck, RotateCcw, Headphones } from 'lucide-react';

const categories = ['Electronics', 'Fashion', 'Home', 'Beauty'];

const perks = [
  { icon: Truck, title: 'Free Shipping', text: 'On orders over 500 EGP' },
  { icon: ShieldCheck, title: 'Secure Payment', text: '100% secure transactions' },
  { icon: RotateCcw, title: 'Easy Returns', text: '14-day return policy' },
  { icon: Headphones, title: '24/7 Support', text: 'Dedicated support team' },
];

export default function EmptyCart() {
  return (
    <main className="bg-white">
      {/* Empty state */}
      <section className="max-w-xl mx-auto px-4 pt-0 pb-16 flex flex-col items-center text-center">
        {/* Icon circle */}
        <div className="relative mb-8">
          <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center">
            <Package className="w-12 h-12 text-gray-300" strokeWidth={1.75} />
          </div>
          {/* soft shadow under the circle */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-3 rounded-full bg-gray-100 blur-md" />
        </div>

        <h1 className="text-2xl font-bold text-slate-900 mb-3">Your cart is empty</h1>
        <p className="text-gray-500 leading-relaxed mb-8">
          Looks like you haven&apos;t added anything to your cart yet.
          <br />
          Start exploring our products!
        </p>

        <Link
          href="/products"
          className="inline-flex items-center gap-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold px-8 py-4 rounded-xl shadow-lg shadow-green-600/25 transition"
        >
          Start Shopping
          <ArrowRight className="w-5 h-5" />
        </Link>

        {/* Popular categories */}
        <div className="w-full mt-12 pt-8 border-t border-gray-100">
          <p className="text-sm text-gray-400 mb-4">Popular Categories</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {categories.map((cat) => (
              <Link
                key={cat}
                href="/products"
                className="px-5 py-2 rounded-full bg-gray-100 hover:bg-green-50 hover:text-green-700 text-sm text-slate-600 transition"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Perks strip */}
      <section className="bg-green-50/60 border-t border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {perks.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">{title}</p>
                <p className="text-xs text-gray-500">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}