import { configureStore } from '@reduxjs/toolkit';
import { authSlice, scoreSlice, themeSlice } from './';


export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        score: scoreSlice.reducer,
        theme: themeSlice.reducer
    },
})