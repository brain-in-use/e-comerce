// import React, { useState} from "react";
// import { useNavigate } from "react-router-dom";
// function Cart() {
//     const navigator=useNavigate();
//   const [cartItems, setCartItems] = useState([
//     { id: 1, name: "Product 1", price: 100, quantity: 1 },
//     { id: 2, name: "Product 2", price: 500, quantity: 2 },
//     { id: 3, name: "Product 3", price: 150, quantity: 1 },
//   ]);

//   const updateQuantity = (id, amount) => {
//     setCartItems((prevItems) =>
//       prevItems.map((item) =>
//         item.id === id
//           ? { ...item, quantity: Math.max(1, item.quantity + amount) }
//           : item
//       )
//     );
//   };

//   const removeItem = (id) => {
//     setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
//   };

//   const getTotal = () =>
//     cartItems.reduce((total, item) => total + item.price * item.quantity, 0);


//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold text-center mb-6">Shopping Cart</h1>
//       {cartItems.length > 0 ? (
//         <div className="bg-white shadow-md rounded-lg p-6">
//           <table className="w-full text-left border-collapse">
//             <thead>
//               <tr className="border-b">
//                 <th className="py-2">Product</th>
//                 <th className="py-2">Price</th>
//                 <th className="py-2">Quantity</th>
//                 <th className="py-2">Subtotal</th>
//                 <th className="py-2">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {cartItems.map((item) => (
//                 <tr key={item.id} className="border-b">
//                   <td className="py-4">{item.name}</td>
//                   <td className="py-4">${item.price}</td>
//                   <td className="py-4 flex items-center space-x-2">
//                     <button
//                       onClick={() => updateQuantity(item.id, -1)}
//                       className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
//                     >
//                       -
//                     </button>
//                     <span className="px-3">{item.quantity}</span>
//                     <button
//                       onClick={() => updateQuantity(item.id, 1)}
//                       className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
//                     >
//                       +
//                     </button>
//                   </td>
//                   <td className="py-4">${item.price * item.quantity}</td>
//                   <td className="py-4">
//                     <button
//                       onClick={() => removeItem(item.id)}
//                       className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//                     >
//                       Remove
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           <div className="flex justify-between items-center mt-6">
//             <h2 className="text-2xl font-semibold">Total: ${getTotal()}</h2>
//             <button onClick={()=>navigator('/checkout')} className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700">
//               Proceed to Checkout
//             </button>
//           </div>
//         </div>
//       ) : (
//         <p className="text-center text-lg text-gray-600">Your cart is empty.</p>
//       )}
//     </div>
//   );
// }

// export default Cart;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios

function Cart() {
  const navigator = useNavigate();
  const [cartItems, setCartItems] = useState([]); // Products fetched from backend
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch cart items from backend
  const fetchCartItems = async () => {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage

    if (!token) {
      alert("Please log in to view your cart.");
      navigator("/login");
      return;
    }

    try {
      const response = await axios.get("http://localhost:8080/api/cart", {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token in headers
        },
      });

      setCartItems(response.data); // Set cart items from the response
      console.log(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch cart items.");
    } finally {
      setLoading(false);
    }
  };

  // Update quantity of a product
  const updateQuantity = (id, amount) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
    );
  };

  // Remove an item from the cart
  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Calculate the total price
  const getTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  useEffect(() => {
    fetchCartItems(); // Fetch cart items when component loads
  }, []);

  if (loading) {
    return <div>Loading your cart...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Shopping Cart</h1>
      {cartItems.length > 0 ? (
        <div className="bg-white shadow-md rounded-lg p-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-2">Product</th>
                <th className="py-2">Price</th>
                <th className="py-2">Quantity</th>
                <th className="py-2">Subtotal</th>
                <th className="py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="py-4">{item.name}</td>
                  <td className="py-4">${item.price}</td>
                  <td className="py-4 flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
                    >
                      -
                    </button>
                    <span className="px-3">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
                    >
                      +
                    </button>
                  </td>
                  <td className="py-4">${item.price * item.quantity}</td>
                  <td className="py-4">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center mt-6">
            <h2 className="text-2xl font-semibold">Total: ${getTotal()}</h2>
            <button
              onClick={() => navigator("/checkout")}
              className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center text-lg text-gray-600">Your cart is empty.</p>
      )}
    </div>
  );
}

export default Cart;
