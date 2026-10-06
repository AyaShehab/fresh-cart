'use server'

import { ShippingData } from '@/app/checkout/CheckoutForm'
import { getTokenFun } from '@/utilities/getTokenData'

export async function payOnline(cartId: string, shippingAddress:ShippingData ) {
  const token = await getTokenFun()
  
  if (!token) {
    throw new Error('Unauthorized')
  }

  try {
    const domain = process.env.NEXT_PUBLIC_DOMAIN_URL || 'http://localhost:3000'

    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${domain}`,
      {
        method: 'POST',
        headers: {
          token: token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          shippingAddress: {
            details: shippingAddress.details,
            phone: shippingAddress.phone,
            city: shippingAddress.city,
          },
        }),
      }
    )

    if (!response.ok) {
      throw new Error('Failed to create checkout session')
    }

    const payload = await response.json()
    return payload
  } catch (error) {
    throw new Error('Payment process failed')
  }
}