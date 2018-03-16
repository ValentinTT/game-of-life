import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from './Store.js';
import './index.css';
import App from './App.jsx';
import registerServiceWorker from './registerServiceWorker';
import {generateState} from './generatState';

const store = configureStore();
console.log(store.getState());

let gameId = 0;
let previusPlay = false;
store.subscribe(() => {
    let newPlay = store.getState().boardPlaying;
    if(newPlay && newPlay != previusPlay) {
        gameId = setInterval(() => store.dispatch({
            type:"NEXT_STATE",
            nextState:  generateState(store.getState().boardState)
        }), 1000);
    }
    else if (!newPlay && newPlay != previusPlay)
        clearInterval(gameId);
    previusPlay = newPlay;
});

ReactDOM.render(<Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
