import { useState } from 'react';
import './App.css';
import Board from './components/Board/Board';
import Square from './components/Square/Square';
import ScoreBoard from './components/ScoreBoard/ScoreBoard';

const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const App = () => {
  const [turn, setTurn] = useState(null);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [winningSquares, setWinningSquares] = useState([]);
  const [score, setScore] = useState({
    X: 0,
    O: 0
  });
  const [playerXName, setPlayerXName] = useState('');
  const [playerOName, setPlayerOName] = useState('');

  const reset = () => {
    setSquares(Array(9).fill(null));
    setTurn(null);
    setWinningSquares([]);
  };

  const checkForWinner = newSquares => {
    for (let i = 0; i < winningPositions.length; i++) {
      const [a, b, c] = winningPositions[i];
      if (
        newSquares[a] &&
        newSquares[a] === newSquares[b] &&
        newSquares[a] === newSquares[c]
      ) {
        endGame(newSquares[a], winningPositions[i]);
        return;
      }
    }
    if (!newSquares.includes(null)) {
      endGame(null, Array.from(Array(10).keys()));
      return;
    }

    setTurn(turn === 'X' ? 'O' : 'X');
  };

  const handleClick = square => {
    if (turn === null) {
      return;
    }
    let newSquares = [...squares];
    newSquares.splice(square, 1, turn);
    setSquares(newSquares);
    checkForWinner(newSquares);
  };

  const handleStartClick = selectedTurn => {
    setTurn(selectedTurn);
  };

  const handlePlayerXNameChange = event => {
    setPlayerXName(event.target.value);
  };

  const handlePlayerONameChange = event => {
    setPlayerOName(event.target.value);
  };

  const endGame = (result, winningPositions) => {
    setTurn(null);
    if (result !== null) {
      setScore({
        ...score,
        [result]: score[result] + 1
      });
    }

    setWinningSquares(winningPositions);
    setTimeout(reset, 2000);
  };

  return (
    <>
      <div className="container">
        {turn === null ? (
          <div>
            <label>
              Player X Name:
              <input
                type="text"
                value={playerXName}
                onChange={handlePlayerXNameChange}
              />
            </label>
            <br />
            <label>
              Player O Name:
              <input
                type="text"
                value={playerOName}
                onChange={handlePlayerONameChange}
              />
            </label>
            <br />
            <button onClick={() => handleStartClick('X')}>Start as X</button>
            <button onClick={() => handleStartClick('O')}>Start as O</button>
          </div>
        ) : (
          <>
            <Board
              winningSquares={winningSquares}
              turn={turn}
              squares={squares}
              onClick={handleClick}
            />
            <ScoreBoard
              scoreO={score.O}
              scoreX={score.X}
              playerOName={playerOName}
              playerXName={playerXName}
            />
          </>
        )}
      </div>
    </>
  );
};

export default App;