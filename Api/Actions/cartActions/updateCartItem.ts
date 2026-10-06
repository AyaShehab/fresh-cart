'use server'

import { getTokenFun } from '@/utilities/getTokenData'

export async function updateCart({ prodId, count }: { prodId: string; count: number }) {
  const token = await getTokenFun()

  if (!token) {
    return { success: false, message: 'Login first' }
  }

  try {
    const response = await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${prodId}`, {
      method: 'PUT',
      headers: {
        token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ count }),
    })

    const payload = await response.json()

    if (!response.ok) {
      console.error('Update cart error:', response.status, payload)
      return { success: false, message: payload?.message ?? 'Failed to update cart' }
    }

    return { success: true, message: 'Cart updated successfully', data: payload }
  } catch (error) {
    console.error('updateCart failed:', error)
    return { success: false, message: 'Something went wrong' }
  }
}