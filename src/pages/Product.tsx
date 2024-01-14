import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductDetails from "../components/ProductDetails";
import Header from "../components/Header";

function Product() {
  const { item, source } = useParams<{ item: string; source: string }>();
  const [searchResults, setSearchResults] = useState<string[]>([]);

  useEffect(() => {
    // Use the item parameter if available
    if (item) {
      setSearchResults([decodeURIComponent(item)]);
    }

    // Check the source parameter to determine the source of the item
    if (source === "search") {
      console.log("Item from search:", item);
    } else {
      setSearchResults([]);
    }
  }, [item, source]);

  console.log("test dans Product", searchResults, source);

  return (
    <div>
      <Header
        onSearch={(query: string, source: string) => setSearchResults([query])}
      />
      <ProductDetails searchResults={searchResults} />
    </div>
  );
}

export default Product;
