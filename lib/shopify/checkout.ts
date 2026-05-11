import type { CartItem } from '@/lib/context/cart-context'

const SHOPIFY_STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || 'your-store.myshopify.com'

// Build Shopify checkout URL with cart items
export function buildShopifyCheckoutUrl(items: CartItem[]): string {
  // If we have a real Shopify store domain, use the cart permalink format
  // Format: https://store.myshopify.com/cart/variant_id:quantity,variant_id:quantity
  
  // For demo purposes without real Shopify variant IDs, we'll use the /cart page
  // with line items. In production, you'd map product IDs to Shopify variant IDs.
  
  const baseUrl = `https://${SHOPIFY_STORE_DOMAIN}`
  
  // Build cart items string for Shopify
  // In production, you'd use actual Shopify variant IDs
  const cartItems = items.map(item => {
    // Using product name as identifier for demo
    // In real implementation, map to Shopify variant_id:quantity
    return `${encodeURIComponent(item.product.name)}:${item.quantity}`
  }).join(',')
  
  // Return to Shopify checkout page
  // For a real implementation with variant IDs:
  // return `${baseUrl}/cart/${variantId}:${quantity},...`
  
  return `${baseUrl}/cart?note=${encodeURIComponent(cartItems)}`
}

// Alternative: Create checkout via Shopify Storefront API
export async function createShopifyCheckout(items: CartItem[]): Promise<string | null> {
  const SHOPIFY_STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN
  
  if (!SHOPIFY_STOREFRONT_TOKEN) {
    console.warn('Shopify Storefront token not configured')
    return null
  }

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

  // Map cart items to Shopify line items
  // In production, you'd have Shopify variant IDs stored with products
  const lineItems = items.map(item => ({
    merchandiseId: `gid://shopify/ProductVariant/${item.product.id}`,
    quantity: item.quantity,
  }))

  try {
    const response = await fetch(`https://${SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN,
      },
      body: JSON.stringify({
        query: mutation,
        variables: {
          input: {
            lines: lineItems,
          },
        },
      }),
    })

    const data = await response.json()
    
    if (data.data?.cartCreate?.cart?.checkoutUrl) {
      return data.data.cartCreate.cart.checkoutUrl
    }
    
    return null
  } catch (error) {
    console.error('Failed to create Shopify checkout:', error)
    return null
  }
}
