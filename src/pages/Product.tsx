import React from "react";
import { useParams } from "react-router-dom";
import ProductDetails from "../components/ProductDetails"; // Import your ProductDetails component

function Product() {
  // Utilize the hook useParams to get URL parameters
  const { item } = useParams();

  // Check if item is defined before using it
  if (!item) {
    // If item is not defined, handle the appropriate case here
    return <div>Item not found</div>;
  }

  return (
    <div>
      {/* Your product-specific JSX */}
      <h2>Product Page</h2>
      {/* Display the retrieved URL parameter */}
      <p>Item Name: {decodeURIComponent(item)}</p>
      {/* Add your product-related content here */}

      {/* Call the ProductDetails component with the item parameter */}
      <ProductDetails />
    </div>
  );
}

export default Product;
