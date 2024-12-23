import React, { useState, useEffect } from "react";



function Products(props) {
  const [products, setProducts] = useState([]); // Initial product list
  const [hasMore, setHasMore] = useState(true); // Check if more products are available
  const [loading, setLoading] = useState(false); // Loading state

  // Load initial products
  useEffect(() => {
    loadMoreProducts();
  }, []);

  const loadMoreProducts = async () => {
    if (!hasMore || loading) return;
  
    setLoading(true);
  
    const offset = products.length; // Current number of loaded products
    const limit = 10; // Fetch 10 products at a time
  
    props.setProgress(20)
    props.setProgress(70)
    const response= await fetch(`http://localhost:8080/api/products?offset=${offset}&limit=${limit}`)
    .then((response) => response.json())
    .then((data) => {
      setProducts(products.concat(data));
      props.setProgress(100)
        setLoading(false);
        if (data.length < limit) {
          setHasMore(false); // No more products to load
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error,response);
        setLoading(false);
      });
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
              src="https://drive.google.com/thumbnail?id=1tV4oomjUNZFwpusQdD96pGbGcNauK-SH=w1000"
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
