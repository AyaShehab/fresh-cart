'use server'
import { getTokenFun } from '@/utilities/getTokenData'

export async function addToCart(prodId: string) {
  const token = await getTokenFun()
  console.log("ADD TO CART TOKEN:", token ? "exists" : "MISSING")

  if (!token) {
    throw new Error('Unauthorized: no token')
  }

  const response = await fetch('https://ecommerce.routemisr.com/api/v2/cart', {
    method: 'POST',
    body: JSON.stringify({ productId: prodId }),
    headers: {
      token: token,
      'Content-Type': 'application/json',
    },
  })

  const text = await response.text()
  console.log("ADD TO CART RESPONSE:", response.status, text)

  if (!response.ok) {
    throw new Error(`Cart API ${response.status}: ${text}`)
  }

  return JSON.parse(text)
}