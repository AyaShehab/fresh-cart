'use server'

import { getTokenFun } from '@/utilities/getTokenData'

export async function applyCoupon(couponCode: string) {
  const token = await getTokenFun()

  if (!token) {
    return { success: false, message: 'Login first' }
  }

  try {
    const response = await fetch('https://ecommerce.routemisr.com/api/v2/cart/applyCoupon', {
      method: 'PUT',
      headers: {
        token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ couponName: couponCode }),
    })

    const payload = await response.json()

    if (!response.ok) {
      console.error('Apply coupon error:', response.status, payload)
      return { success: false, message: payload?.message ?? 'Invalid coupon' }
    }

    return { success: true, message: 'Coupon applied successfully', data: payload }
  } catch (error) {
    console.error('applyCoupon failed:', error)
    return { success: false, message: 'Something went wrong' }
  }
}