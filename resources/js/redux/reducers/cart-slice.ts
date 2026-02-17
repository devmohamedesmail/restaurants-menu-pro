
import { createSlice } from '@reduxjs/toolkit';

const initialState = {meals: []}

// Create a slice for the cart
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add product to cart
    add_to_cart: (state, action) => {
      const existingItem = state.meals.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity; 
      } else {
        state.meals.push(action.payload); 
      }
    },

    remove_from_cart: (state, action) => {
      state.meals = state.meals.filter((item) => item.id !== action.payload);
    },
    increase_quantity: (state, action) => {
      const item = state.meals.find(item => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decrease_quantity: (state, action) => {
      const item = state.meals.find(item => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.meals = state.meals.filter((item) => item.id !== action.payload); 
      }
    },
    reset_cart: (state) => {
      state.meals = [];
    }


    
    
  }
});

// Export actions
export const { add_to_cart, remove_from_cart ,increase_quantity, decrease_quantity,reset_cart } = cartSlice.actions;

// Export reducer
export default cartSlice.reducer;
