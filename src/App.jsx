import React from 'react';
import {connect} from 'react-redux';
import { dispatchChangeCell, dispatchGamePlaying, dispatchClearBoard, dispatchRandomBoard } from './Actions';
import './css/App.min.css';

let Cell = ({cell, row, column, onCellClick}) => (
  <div
    className={"cell-" + cell}
    onClick={onCellClick}/>
);
const mapDispatchToProps = (dispatch, ownProps) => ({
  onCellClick: () => (
    dispatch(dispatchChangeCell(
      ownProps.row, 
      ownProps.column, 
      ownProps.cell===1?0:1))
  )
});
Cell = connect(null, mapDispatchToProps)(Cell);

let Board = ({board}) => (
  <div className="board">
    {board.map((v, indexRow) => v.map((cell, indexColumn) => (
      <Cell 
				key={indexRow*2+indexColumn} 
				cell={cell} 
				row={indexRow} 
				column={indexColumn} />
    )))}
  </div>
);
Board = connect((state) => ({board: state.boardState}))(Board);

let BoardControls = ({gamePlaying, generations, dispatch}) => (
    <div className="board-controls">
      <p className="board-generations" >Generations: {generations}</p>
      <div className="board-control-buttons" >
        <a 
          className={"btn "}
          onClick={() => dispatch(dispatchClearBoard())}>Clear board</a>
        <br/>
        <a
          className={"btn "}
          onClick={() => {
            dispatch(dispatchGamePlaying(!gamePlaying));
        }}>
          {gamePlaying
            ? "Pause"
            : "Play"}
        </a>
        <br/>
        <a 
          className={"btn "}
          onClick={() => dispatch(dispatchRandomBoard())}>Random board
        </a>
      </div>      
    </div>
);

const mapStateToProps = (state) =>  ({
  gamePlaying: state.boardPlaying,
  generations: state.boardGeneration
});
BoardControls = connect(mapStateToProps)(BoardControls);

const BoardSection = () => (
  <div className="board-section">
    <Board />
    <BoardControls />
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
      <a 
        className="link" 
        href="https://github.com/ValentinTapiaTorti" 
        target="_black">
      Valentin TT</a>.
    </h4>
  </footer>
)

const App = () => (
  <div className="App">
    <Header />
    <BoardSection />
    <Footer />
  </div>
);
export default App;
