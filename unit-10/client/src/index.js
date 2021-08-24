import React from 'react';
import ReactDOM from 'react-dom';
import './styles/global.css';
import { Provider } from './utils/Context'
import App from './App';

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById('root')
);
