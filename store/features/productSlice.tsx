"use client"
import { ProductProps } from "@/lib/product";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
 
const loadState = (): ProductState => {
  try {
    return { items: [], totalQuantity: 0 };
  } catch (err) {
    console.error("loadState error:", err);
    return { items: [], totalQuantity: 0 };
  }
};

interface ProductState {
  items: ProductProps[];
  totalQuantity: number;
}
 
const initialState: ProductState = loadState();
 
export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    hydrate: (state, action: PayloadAction<ProductState>) => {
      return action.payload;
    },
    addProduct: (state, action: PayloadAction<ProductProps>) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.totalQuantity += 1;
      try {
        if (typeof window !== 'undefined') {
          localStorage.setItem("cartState", JSON.stringify(state));
        }
      } catch (err) {
        console.error("Save state error:", err);
      }
    },
    removeProduct: (state, action: PayloadAction<ProductProps>) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity -= 1;
        if (existingItem.quantity === 0) {
          state.items = state.items.filter((filt) => filt.id !== action.payload.id);
        }
      }
      state.totalQuantity = Math.max(0, state.totalQuantity - 1);
      try {
        if (typeof window !== 'undefined') {
          localStorage.setItem("cartState", JSON.stringify(state));
        }
      } catch (err) {
        console.error("Save state error:", err);
      }
    },
    clearProducts: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      try {
        if (typeof window !== 'undefined') {
          localStorage.removeItem("cartState");
        }
      } catch (err) {
        console.error("Clear state error:", err);
      }
    },
  },
});
 
export const { addProduct, removeProduct, clearProducts, hydrate } =
  productSlice.actions;
export default productSlice.reducer;