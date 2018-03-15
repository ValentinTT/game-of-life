import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore, randomState } from './Store.js';
import './index.css';
import App from './App.jsx';
import registerServiceWorker from './registerServiceWorker';

const store = configureStore();
console.log(store.getState());
ReactDOM.render(<Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
