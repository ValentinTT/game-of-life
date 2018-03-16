import {createStore, combineReducers, applyMiddleware} from 'redux';
import logger from 'redux-logger';

export const [columns,
    rows] = [50, 50]

export const randomState = () => Array.from({
    length: rows
}, () => Array.from({
    length: columns
}, () => Math.floor(Math.random() * 2)));

const clearBoard = () => Array(rows).fill(Array(columns).fill(0));

const checkNextState = (newState) => (newState.length === rows && newState[0].length === columns);
const changeCell = (state, newCell) => {
    if ( newCell.column >= columns ||
        newCell.column < 0 ||
        newCell.rows >= rows ||
        newCell.rows < 0 ||
        ![0, 1].includes(newCell.value)
    ) return state;
    return [
        ...state.slice(0, newCell.row),
        [
            ...state[newCell.row].slice(0, newCell.column),
            newCell.value,
            ...state[newCell.row].slice(newCell.column + 1)
        ],
        ...state.slice(newCell.row + 1)
    ];
}
const boardState = (state = randomState(), action) => {
    switch (action.type) {
        case "NEXT_STATE":
            return checkNextState(action.nextState)
                ? action.nextState
                : state;
        case "PARTICULAR_CHANGE":
            return changeCell(state, action.newCell);
        case "CLEAR_BOARD": 
            return clearBoard();
        case "RANDOM_STATE":
            return randomState();
        default:
            return state;
    }
}

const boardGeneration = (state = 0, action) => {
    switch(action.type) {
        case "NEXT_STATE":
            return state + 1;
        case "CLEAR_BOARD": 
            return 0;
        default:
            return state;
    }
}

const boardPlaying = (state = false, action) => {
    switch (action.type) {
        case "CHANGE_GAME_PLAYING":
            return action.playing
        default:
            return state;
    }
}

const reducer = combineReducers({boardState, boardGeneration, boardPlaying});

export const configureStore = () => createStore(reducer, applyMiddleware(logger));