import { generateState } from './generatState';

export const CHANGE_CELL = "PARTICULAR_CHANGE";
export const RANDOM_BOARD = "RANDOM_BOARD";
export const NEXT_STATE = "NEXT_STATE";
export const CLEAR_BOARD = "CLEAR_BOARD";
export const GAME_PLAYING = "CHANGE_GAME_PLAYING";

export const dispatchNextState = (prevState) => {
    let nextState = generateState(prevState);
    if(nextState === null)  
        return{
            type: CLEAR_BOARD
        };  
    return {
        type: NEXT_STATE,
        nextState
    };
};

export const dispatchChangeCell = (row, column, value) => ({
    type: CHANGE_CELL,
    newCell: {
      row,
      column,
      value
    }
});

export const dispatchGamePlaying = (playing) => ({
    type: GAME_PLAYING,
    playing
});

export const dispatchClearBoard = () => ({
    type: CLEAR_BOARD
});

export const dispatchRandomBoard = () => ({
    type: RANDOM_BOARD
});