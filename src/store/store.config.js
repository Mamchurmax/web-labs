import {configureStore} from "@reduxjs/toolkit";
import transportationReducer from "./TransportationSlice";
import cartReducer from "./CartSlice";


const store = configureStore({
    reducer: {
        transportationReducer,
        cartReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store;