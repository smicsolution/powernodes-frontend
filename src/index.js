import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Web3ReactProvider } from '@web3-react/core';
import Web3 from 'web3';
import { Provider } from 'react-redux';

import MetamaskProvider from "./provider/MetamaskProvider";
import store from './redux/store';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// const POLLING_INTERVAL = 12000;

// const getLibrary = (provider) => {
//   const library = new ethers.providers.Web3Provider(provider);
//   library.pollingInterval = POLLING_INTERVAL;
//   return library;
// };

function getLibrary (provider) {
  return new Web3(provider);
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <MetamaskProvider>
          <Router>
            <App />
          </Router>
        </MetamaskProvider>
      </Web3ReactProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
