import { createStore, combineReducers /*, applyMiddleware*/ } from 'redux';
//import logger from 'redux-logger';
import { CHANGE_CELL , RANDOM_BOARD , NEXT_STATE , CLEAR_BOARD , GAME_PLAYING } from './Actions.js'

export const [columns,
    rows] = [50, 50]

export const randomState = () => Array.from({
    length: rows
}, () => Array.from({
    length: columns
}, () => Math.floor(Math.random() * 2)));

const clearBoard = () => Array(rows).fill(Array(columns).fill(0));

const changeCell = (state, newCell) => [
    ...state.slice(0, newCell.row),
    [
        ...state[newCell.row].slice(0, newCell.column),
        newCell.value,
        ...state[newCell.row].slice(newCell.column + 1)
    ],
    ...state.slice(newCell.row + 1)
];
    
const boardState = (state = randomState(), action) => {
    switch (action.type) {
        case NEXT_STATE:
            return action.nextState;
        case CHANGE_CELL:
            return changeCell(state, action.newCell);
        case CLEAR_BOARD: 
            return clearBoard();
        case RANDOM_BOARD:
            return randomState();
        default:
            return state;
    }
}

const boardGeneration = (state = 0, action) => {
    switch(action.type) {
        case NEXT_STATE:
            return state + 1;
        case CLEAR_BOARD: 
            return 0;
        default:
            return state;
    }
}

const boardPlaying = (state = false, action) => {
    switch (action.type) {
        case GAME_PLAYING:
            return action.playing;
        case CLEAR_BOARD:
        case RANDOM_BOARD: 
            return false;
        default:
            return state;
    }
}

const reducer = combineReducers({boardState, boardGeneration, boardPlaying});

export const configureStore = () => createStore(reducer);/*, applyMiddleware(logger));*/