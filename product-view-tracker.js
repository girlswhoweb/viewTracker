import { api } from "@gadget-client/product-optimiser";

async function trackProductView(productId) {
  try {
    // 1️⃣ Check if the product already has a view record
    const existingProductView = await api.productViews.findMany({
      filter: { productId: { equals: productId } },
    });

    if (existingProductView.length > 0) {
      // 2️⃣ If the product exists, update its view count
      const productView = existingProductView[0]; // Get the first matching record
      await api.productViews.update(productView.id, {
        viewCount: productView.viewCount + 1,
      });

      console.log(`🔄 View count updated to ${productView.viewCount + 1} for product ${productId}`);
    } else {
      // 3️⃣ If the product does not exist, create a new record
      await api.productViews.create({
        productId: productId,
        viewCount: 1,
      });

      console.log(`✅ New product view tracked for product ${productId}`);
    }
  } catch (error) {
    console.error("❌ Failed to track product view:", error);
  }
}

// Get the product ID from Shopify's global object
const productId = window.Shopify?.product?.id;

if (productId) {
  trackProductView(productId);
}
