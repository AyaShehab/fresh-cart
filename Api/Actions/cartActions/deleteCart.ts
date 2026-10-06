'use server'

import { getTokenFun } from '@/utilities/getTokenData'

export async function deleteCart() {
  const token = await getTokenFun()

  if (!token) {
    return { success: false, message: 'Login first' }
  }

  try {
    const response = await fetch('https://ecommerce.routemisr.com/api/v2/cart', {
      method: 'DELETE',
      headers: {
        token,
        'Content-Type': 'application/json',
      },
    })

    const payload = await response.json()

    if (!response.ok) {
      console.error('Clear cart error:', response.status, payload)
      return { success: false, message: payload?.message ?? 'Failed to clear cart' }
    }

    return { success: true, message: 'Cart cleared successfully', data: payload }
  } catch (error) {
    console.error('deleteCart failed:', error)
    return { success: false, message: 'Something went wrong' }
  }
}