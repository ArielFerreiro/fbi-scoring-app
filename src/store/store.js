import { configureStore } from '@reduxjs/toolkit';
import { authSlice, scoreSlice, themeSlice, tournamentSlice } from './';


export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        tournament: tournamentSlice.reducer,
        score: scoreSlice.reducer,
        theme: themeSlice.reducer
    },
})