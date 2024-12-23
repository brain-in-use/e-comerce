// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { logout } from "../redux/slices/authSlice"; // Import login action
// import {Link} from 'react-router-dom'

// function Signup() {
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
  
//     const validateForm = () => {
//       return (
//         name.length >= 3 &&
//         /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
//         password.length >= 8
//       );
//     };
  
//     const handleSignup = (e) => {
//       e.preventDefault();
//       if (validateForm()) {
//         console.log("Signed up with:", { name, email, password });
//       } else {
//         alert("Please fill out the form correctly.");
//       }
//     };
  
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-100">
//         <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
//           <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>
//           <form onSubmit={handleSignup} className="space-y-4">
//             <div>
//               <label htmlFor="name" className="block text-sm font-medium text-gray-600">
//                 Full Name
//               </label>
//               <input
//                 type="text"
//                 id="name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 placeholder="Enter your name"
//                 className="w-full px-4 py-2 mt-1 text-sm border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none focus:border-blue-500"
//                 required
//               />
//             </div>
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-600">
//                 Email Address
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Enter your email"
//                 className="w-full px-4 py-2 mt-1 text-sm border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none focus:border-blue-500"
//                 required
//               />
//             </div>
//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-600">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Enter your password (min. 8 characters)"
//                 className="w-full px-4 py-2 mt-1 text-sm border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none focus:border-blue-500"
//                 required
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring focus:ring-blue-300 focus:outline-none"
//             >
//               Sign Up
//             </button>
//           </form>
//           <p className="mt-4 text-sm text-center text-gray-600">
//             Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Log in</Link>
//           </p>
//         </div>
//       </div>
//     );
//   }
  
//   export default Signup;



import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Import Axios

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Loading state for the button
  const [error, setError] = useState(null); // To display error messages
  const role="USER";

  const validateForm = () => {
    return (
      name.length >= 3 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
      password.length >= 8
    );
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert("Please fill out the form correctly.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Make the POST request to the backend
      const response = await axios.post("http://localhost:8080/auth/register", {
        name,
        email,
        password,
        role
      });

      console.log("Signup successful:", response.data);
      alert("Signup successful! You can now log in.");
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-600">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-2 mt-1 text-sm border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 mt-1 text-sm border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password (min. 8 characters)"
              className="w-full px-4 py-2 mt-1 text-sm border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full px-4 py-2 text-white ${
              loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            } rounded-lg focus:ring focus:ring-blue-300 focus:outline-none`}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        {error && <p className="mt-4 text-sm text-center text-red-600">{error}</p>}
        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
