import React from 'react';
import ReactDOM from 'react-dom'; // Import ReactDOM from 'react-dom'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GlobalStateProvider } from './contexts/GlobalStateContext'; // Import GlobalStateProvider

ReactDOM.render(
  <React.StrictMode>
    <GlobalStateProvider>
      <App />
    </GlobalStateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
