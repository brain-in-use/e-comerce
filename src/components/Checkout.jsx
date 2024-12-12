import React from "react";

function Checkout() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Checkout</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <form>
          <h2 className="text-2xl font-semibold mb-4">Billing Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-2 border rounded focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                placeholder="john.doe@example.com"
                className="w-full px-4 py-2 border rounded focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Phone</label>
              <input
                type="text"
                placeholder="+1234567890"
                className="w-full px-4 py-2 border rounded focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Address</label>
              <input
                type="text"
                placeholder="123 Main Street"
                className="w-full px-4 py-2 border rounded focus:outline-none"
              />
            </div>
          </div>
          <h2 className="text-2xl font-semibold mt-6 mb-4">Payment Information</h2>
          <div>
            <label className="block text-gray-700 mb-2">Card Number</label>
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              className="w-full px-4 py-2 border rounded focus:outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-gray-700 mb-2">Expiry Date</label>
              <input
                type="text"
                placeholder="MM/YY"
                className="w-full px-4 py-2 border rounded focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">CVV</label>
              <input
                type="text"
                placeholder="123"
                className="w-full px-4 py-2 border rounded focus:outline-none"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full mt-6 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
