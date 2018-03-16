import React from 'react';
import {connect} from 'react-redux';
import {generateState} from './generatState';
import './css/App.min.css';

let Board = ({board}) => (
  <div className="board">
    {board.map((v) => v.map((cell, index) => (
      <div key={index} className={"cell cell-" + cell}></div>
    )))}
  </div>
);
Board = connect((state) => ({board: state.boardState}))(Board);

let BoardControls = ({gamePlaying, generations, dispatch}) => {

  return (
    <div className="board-controls">
      <a
        onClick={() => {
        dispatch({
          type: "CHANGE_GAME_PLAYING",
          playing: !gamePlaying
        });
      }}>
        {gamePlaying
          ? "PAUSE"
          : "PLAY"}
      </a>
      <p>Generations: {generations}</p>
    </div>
  );
}

const mapStateToProps = (state) =>  ({
  gamePlaying: state.boardPlaying,
  generations: state.boardGeneration
});
BoardControls = connect(mapStateToProps)(BoardControls);

const BoardSection = () => (
  <div className="board-section">
    <Board/>
    <BoardControls/>
  </div>
)

const Header = () => (
  <header>
    <h1>Game of Life</h1>
  </header>
);

const Footer = () => (
  <footer>
    <h4>{`Coded by `}
      <a href="https://github.com/ValentinTapiaTorti" target="_black">Valentin TT</a>.</h4>
  </footer>
)

let App = ({board, dispatch}) => (
  <div className="App">
    <Header/>
    <BoardSection/>
    <Footer/>
  </div>
);

App = connect((state) => ({board: state.boardState}))(App);
export default App;
