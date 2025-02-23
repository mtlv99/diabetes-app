import React from 'react';
import ReactDOM from 'react-dom/client';
import Modal from 'react-modal';
import { DiabetesApp } from './DiabetesApp';
import './index.css';

Modal.setAppElement('#root');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DiabetesApp />
  </React.StrictMode>,
);
