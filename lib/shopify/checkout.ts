import type { CartItem } from '@/lib/context/cart-context'

const SHOPIFY_STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!
const SHOPIFY_STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN!

const mutation = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
      }
      userErrors {
        field
        message
      }
    }
  }
`

export async function createShopifyCheckout(items: CartItem[]): Promise<string | null> {
  if (!SHOPIFY_STOREFRONT_TOKEN || !SHOPIFY_STORE_DOMAIN) {
    console.warn('Shopify credentials not configured')
    return null
  }

  // Filter out any items that don't have a shopify_variant_id set
  const validItems = items.filter((item) => item.product.shopify_variant_id)

  if (validItems.length === 0) {
    console.warn('No items have Shopify variant IDs configured')
    return null
  }

  const lineItems = validItems.map((item) => ({
    merchandiseId: `gid://shopify/ProductVariant/${item.product.shopify_variant_id}`,
    quantity: item.quantity,
  }))

  try {
    const response = await fetch(
      `https://${SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN,
        },
        body: JSON.stringify({
          query: mutation,
          variables: { input: { lines: lineItems } },
        }),
      }
    )

    const data = await response.json()

    if (data.data?.cartCreate?.userErrors?.length > 0) {
      console.error('Shopify error:', data.data.cartCreate.userErrors)
      return null
    }

    return data.data?.cartCreate?.cart?.checkoutUrl ?? null
  } catch (error) {
    console.error('Failed to create Shopify checkout:', error)
    return null
  }
}