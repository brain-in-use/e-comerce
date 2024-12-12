import { createSlice } from "@reduxjs/toolkit";

// Initial state for the cart
const initialState = {
  items: [{ id: 1, name: "Product 1 Apple", price: 100, quantity: 1 },
    { id: 2, name: "Product 2", price: 200, quantity: 2 },
    { id: 3, name: "Product 3", price: 150, quantity: 1 },],        // Stores all cart items
  totalItems: 5,    // Tracks the total number of items in the cart
  totalPrice: 0,    // Tracks the total price of the cart
};

// Create slice for cart
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add an item to the cart
    addItem: (state, action) => {
      const newItem = action.payload; // The item to add
      const existingItem = state.items.find(item => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity += newItem.quantity;
        existingItem.subtotal = existingItem.price * existingItem.quantity;
      } else {
        state.items.push({ ...newItem, subtotal: newItem.price * newItem.quantity });
      }

      state.totalItems += newItem.quantity;
      state.totalPrice = state.items.reduce((total, item) => total + item.subtotal, 0);
    },

    // Remove an item from the cart
    removeItem: (state, action) => {
      const itemId = action.payload;
      const itemToRemove = state.items.find(item => item.id === itemId);

      if (itemToRemove) {
        state.totalItems -= itemToRemove.quantity;
        state.totalPrice -= itemToRemove.subtotal;
        state.items = state.items.filter(item => item.id !== itemId);
      }
    },

    // Update the quantity of an item
    updateQuantity: (state, action) => {
      const { itemId, quantity } = action.payload;
      const item = state.items.find(item => item.id === itemId);

      if (item) {
        item.quantity = quantity;
        item.subtotal = item.price * quantity;
        state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
        state.totalPrice = state.items.reduce((total, item) => total + item.subtotal, 0);
      }
    },

    // Reset the cart (e.g., after checkout)
    resetCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, updateQuantity, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
