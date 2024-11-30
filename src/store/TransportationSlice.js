import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import TransportationService from "../services/TransportationService";

export const getTransportations = createAsyncThunk(
    'transportation/getTransportations',
    async (searchOptions, thunkAPI) => {
        return TransportationService.getTransportations(searchOptions);
    }
);

const initialStateTransportation = {
    transportation: [],
    searchOptions: {},
    status: 'pending',
    error: null,
}


export const transportationSlice = createSlice({
    name: 'transportation',
    initialState: initialStateTransportation,
    reducers: {
        setSearchOptions: (state, action) => {
            state.searchOptions = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTransportations.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getTransportations.fulfilled, (state, action) => {
                state.status = 'success';
                state.transportation = action.payload.data;
            })
            .addCase(getTransportations.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

const transportationReducer = transportationSlice.reducer;

export const { setSearchOptions } = transportationSlice.actions;

export { initialStateTransportation }

export default transportationReducer;