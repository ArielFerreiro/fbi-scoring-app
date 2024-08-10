
import { createSlice } from '@reduxjs/toolkit';

export const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        isDarkTheme: false 
    },
    reducers: {
        toggleTheme: (state, /* action */ ) => {
            state.isDarkTheme = !state.isDarkTheme;
        },
    }
});

export const { toggleTheme } = themeSlice.actions;