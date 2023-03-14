import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import easyLogReport from "./log";

easyLogReport.init(() => {
    console.log('EasyLogReport init!')
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
