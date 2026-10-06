const BASE_URL = 'https://ecommerce.routemisr.com/api/v1/wishlist';

// 1. Get logged user wishlist
export async function getWishlist(token: string) {
  if (!token) return { status: 'fail', message: 'No token provided' };

  const res = await fetch(BASE_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      token,
    },
    cache: 'no-store',
  });
  return res.json();
}

// 2. Add product to wishlist
export async function addToWishlist(productId: string, token: string) {
  if (!token) return { status: 'fail', message: 'No token provided' };

  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      token,
    },
    body: JSON.stringify({ productId }),
  });
  return res.json();
}

// 3. Remove product from wishlist
export async function removeFromWishlist(productId: string, token: string) {
  if (!token) return { status: 'fail', message: 'No token provided' };

  const res = await fetch(`${BASE_URL}/${productId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      token,
    },
  });
  return res.json();
}