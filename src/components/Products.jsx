import React, { useState, useEffect } from "react";

const allProducts = [
  // Simulated product data (for demonstration)
  ...Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    name: `Product ${index + 1}`,
    description: `Description for product ${index + 1}`,
    price: `$${(index + 1) * 5}`,
    image: "https://via.placeholder.com/150",
  })),
];

function Products() {
  const [products, setProducts] = useState([]); // Initial product list
  const [hasMore, setHasMore] = useState(true); // Check if more products are available
  const [loading, setLoading] = useState(false); // Loading state

  // Load initial products
  useEffect(() => {
    loadMoreProducts();
  }, []);

  // Function to load more products
  const loadMoreProducts = () => {
    if (!hasMore || loading) return;

    setLoading(true);

    setTimeout(() => {
      const currentLength = products.length;
      const moreProducts = allProducts.slice(
        currentLength,
        currentLength + 10 // Fetch 10 products at a time
      );
      setProducts((prev) => [...prev, ...moreProducts]);
      setLoading(false);
      if (products.length + moreProducts.length >= allProducts.length) {
        setHasMore(false); // No more products to load
      }
    }, 1000); // Simulate network delay
  };

  // Infinite scroll listener
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 5) {
        loadMoreProducts();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [products, hasMore, loading]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg shadow-md p-4 hover:shadow-lg transition"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded"
            />
            <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
            <p className="text-gray-600 mt-1">{product.description}</p>
            <p className="text-blue-500 font-bold mt-2">{product.price}</p>
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Loading Icon */}
      {loading && (
        <div className="flex justify-center mt-6">
          <div className="loader border-t-4 border-blue-600 rounded-full w-12 h-12 animate-spin"></div>
        </div>
      )}

      {/* No More Products Message */}
      {!hasMore && !loading && (
        <p className="text-center text-gray-500 mt-6">No more products to load.</p>
      )}
    </div>
  );
}

export default Products;
