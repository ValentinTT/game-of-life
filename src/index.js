import registerServiceWorker from './registerServiceWorker';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { dispatchNextState } from './Actions';
import { configureStore } from './Store.js';
import App from './App.jsx';
import './index.css';

const store = configureStore();

let previusPlay = false;
store.subscribe(() => {
    if(store.getState().boardPlaying) {
        if (!previusPlay) {
            run();
            previusPlay = true;
        }
    } else if (previusPlay) previusPlay = false;
})

const run = () => {
    setTimeout(() => {
        let {boardState, boardPlaying} = store.getState();
        store.dispatch(
            dispatchNextState(boardState)
        );
        if(boardPlaying)
            run();
    },90);
};

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root'));
registerServiceWorker();
