import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { CssBaseline } from '@mui/material';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Provider from './context/Provider';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <Provider>
      <BrowserRouter>
        <CssBaseline>
          <App />
        </CssBaseline>
      </BrowserRouter>
    </Provider>,
  );

serviceWorker.unregister();
