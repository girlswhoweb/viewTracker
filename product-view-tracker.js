document.addEventListener("DOMContentLoaded", function () {
  const productId = window.Shopify?.product?.id;

  if (productId) {
    console.log(`Tracking view for product ID: ${productId}`);

    // Create an invisible tracking element to confirm the script ran
    const trackingElement = document.createElement("div");
    trackingElement.innerText = `Product ${productId} viewed`;
    trackingElement.style.display = "none"; // Hide element, just for debugging
    document.body.appendChild(trackingElement); // Append to body (works on all themes)

    // Send product view data to your backend
    fetch("https://your-backend-api.com/track-view", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId }),
    })
      .then(response => response.json())
      .then(data => console.log("Product view tracked:", data))
      .catch(error => console.error("Error tracking product view:", error));
  } else {
    console.warn("Not on a product page, skipping tracking.");
  }
});
