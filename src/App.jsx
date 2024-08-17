import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";

import { store } from './store';
import { AppRouter } from "./routes";

export const App = () => {
  return (
    <Provider store={ store }>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Provider>
  )
}