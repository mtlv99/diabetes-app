import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { DiabetesApp } from './DiabetesApp';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <DiabetesApp />
    </BrowserRouter>
  </React.StrictMode>,
);
