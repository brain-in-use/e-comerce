// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { login } from "../redux/slices/authSlice"; // Import login action
// import {Link} from 'react-router-dom'
// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const dispatch = useDispatch();

//   const handleLogin = (e) => {
//     e.preventDefault();
//     // Example login logic, here you might call an API
//     dispatch(login({ email, password }));
//     console.log("Logged in with:", email, password);
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
//         <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
//         <form onSubmit={handleLogin} className="space-y-4">
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-600">
//               Email Address
//             </label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Enter your email"
//               className="w-full px-4 py-2 mt-1 text-sm border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none focus:border-blue-500"
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-600">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Enter your password"
//               className="w-full px-4 py-2 mt-1 text-sm border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none focus:border-blue-500"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring focus:ring-blue-300 focus:outline-none"
//           >
//             Login
//           </button>
//         </form>
//         <p className="mt-4 text-sm text-center text-gray-600">
//           Don’t have an account? <Link to="/signup" className="text-blue-600 hover:underline">Sign up</Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Login;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Make a POST request to the backend login endpoint
      const response = await axios.post("http://localhost:8080/auth/login", {
        email,
        password,
      });

      // Extract token and user from the response
      const { token, user } = response.data;

      // Save token and user to localStorage for persistence
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Navigate to the dashboard or home page
      navigate("/");
    } catch (err) {
      console.error("Login error:", err.response || err.message);
      setError(err.response?.data?.error || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
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
              placeholder="Enter your password"
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
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>
        {error && <p className="mt-4 text-sm text-center text-red-600">{error}</p>}
        <p className="mt-4 text-sm text-center text-gray-600">
          Don’t have an account? <Link to="/signup" className="text-blue-600 hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
