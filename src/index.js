import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

/* Bootstrap */
import 'bootstrap/dist/css/bootstrap.min.css';
import './additionalStyles.css'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
