import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import CartService from "../services/CartServices";

export const getCart = createAsyncThunk(
    'cart/getCart',
    async () => {
        const response = await CartService.getCart();
        return response.data;
    }
);

const initialStateCart = {
    cart: [],
    status: 'pending',
    error: null,
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState: initialStateCart,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCart.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getCart.fulfilled, (state, action) => {
                state.status = 'success';
                state.cart = action.payload;
            })
            .addCase(getCart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});


const cartReducer = cartSlice.reducer;

export { initialStateCart }

export default cartReducer;