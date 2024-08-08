import { Provider } from 'react-redux';

import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { createTheme } from '@mui/material/styles';
import { cyan, orange } from "@mui/material/colors";

import { store } from './store';
import { MainPage } from './pages';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: cyan,
    secondary: orange,
  },
});

export const App = () => {
  return (
    <Provider store={ store }>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <MainPage />
      </ThemeProvider>
    </Provider>
  )
}