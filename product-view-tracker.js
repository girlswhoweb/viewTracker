import React from "react";
import { createRoot } from "react-dom/client";
import { ProductViewTracker } from "../../web/components/ProductViewTracker";

// Get the product ID from the global Shopify object
const productId = window.Shopify?.product?.id;

if (productId) {
  // Create a root element for the React component
  const rootElement = document.createElement("div");
  document.body.appendChild(rootElement);

  // Create a root and render the ProductViewTracker component
  const root = createRoot(rootElement);
  root.render(React.createElement(ProductViewTracker, { productId }));
}
