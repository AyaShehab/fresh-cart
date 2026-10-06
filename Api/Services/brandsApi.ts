export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export async function getBrands(): Promise<Brand[]> {
  try {
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/brands', {
      cache: 'no-store',
    });
    if (!response.ok) throw new Error('Failed to fetch brands');
    const payload = await response.json();
    return payload.data || [];
  } catch (error) {
    console.error('Error fetching brands:', error);
    return [];
  }
}

export async function getProductsByBrand(brandId: string) {
  try {
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`, {
      cache: 'no-store',
    });
    if (!response.ok) throw new Error('Failed to fetch brand products');
    const payload = await response.json();
    return payload.data || [];
  } catch (error) {
    console.error('Error fetching brand products:', error);
    return [];
  }
}