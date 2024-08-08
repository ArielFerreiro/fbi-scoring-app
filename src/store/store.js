import { configureStore } from '@reduxjs/toolkit';
import { scoreSlice } from './';


export const store = configureStore({
    reducer: {
        score:     scoreSlice.reducer
    },
})