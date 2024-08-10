import { configureStore } from '@reduxjs/toolkit';
import { scoreSlice, themeSlice } from './';


export const store = configureStore({
    reducer: {
        score: scoreSlice.reducer,
        theme: themeSlice.reducer
    },
})