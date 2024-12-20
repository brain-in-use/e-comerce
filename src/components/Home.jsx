import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";

function Home(props) {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        props.setProgress(20);

        const response = await fetch(`http://localhost:8080/api/products?offset=0&limit=3`);
        props.setProgress(50);

        const data = await response.json();

        setFeaturedProducts(data);
        props.setProgress(100);
      } catch (error) {
        console.error("Error fetching products:", error);
        props.setProgress(100); // Complete progress even if there's an error
      } 
    };

    fetchFeaturedProducts();
  }, []);



  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white text-center py-20">
        <h1 className="text-4xl font-bold">Welcome to E-Commerce</h1>
        <p className="mt-4 text-lg">Discover amazing products at unbeatable prices.</p>
        <Link to="/products">
          <button className="mt-6 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow">
            Shop Now
          </button>
        </Link>
      </div>

      {/* Featured Products */}
      <div className="container mx-auto px-6 py-12">
        <h2 className="text-2xl font-semibold mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow hover:shadow-lg transition">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-600">{product.price}</p>
                <Link to={`/products/${product.id}`}>
                  <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-6">
        <p>&copy; 2024 E-Commerce. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
