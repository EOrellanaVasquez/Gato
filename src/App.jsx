import { useState, useEffect } from 'react';
import './App.css';
import Board from './components/Board/Board';
import ScoreBoard from './components/ScoreBoard/ScoreBoard';
import PlayerInfo from './components/PlayerInfo/PlayerInfo';

const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const App = () => {
  const [turn, setTurn] = useState(null);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [winningSquares, setWinningSquares] = useState([]);
  const [score, setScore] = useState({
    X: 0,
    O: 0,
  });
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');
  const [player1Symbol, setPlayer1Symbol] = useState('');
  const [player2Symbol, setPlayer2Symbol] = useState('');
  const [roundWinner, setRoundWinner] = useState('');
  const [playerInfoEntered, setPlayerInfoEntered] = useState(false);
  const [lastRoundWinner, setLastRoundWinner] = useState('');

  useEffect(() => {
    if (roundWinner !== '') {
      setLastRoundWinner(roundWinner);
      setRoundWinner('');
    }
  }, [roundWinner]);

  const reset = () => {
    setTurn('X');
    setSquares(Array(9).fill(null));
    setWinningSquares([]);
  };

  const checkForWinner = (newSquares) => {
    for (let i = 0; i < winningPositions.length; i++) {
      const [a, b, c] = winningPositions[i];
      if (newSquares[a] && newSquares[a] === newSquares[b] && newSquares[a] === newSquares[c]) {
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

  const handleClick = (square) => {
    if (turn === null) {
      return;
    }
    let newSquares = [...squares];
    newSquares.splice(square, 1, turn);
    setSquares(newSquares);
    checkForWinner(newSquares);
  };

  const endGame = (result, winningPositions) => {
    setTurn(null);
    if (result !== null) {
      setScore({
        ...score,
        [result]: score[result] + 1,
      });
    }
    setWinningSquares(winningPositions);
    setRoundWinner(result === null ? 'Draw' : result === player1Symbol ? player1Name : player2Name);
    setTimeout(reset, 2000);
  };

  const handlePlayerInfoChange = (name1, name2, symbol) => {
    setPlayer1Name(name1);
    setPlayer2Name(name2);

    if (symbol === 'X') {
      setPlayer1Symbol('X');
      setPlayer2Symbol('O');
    } else {
      setPlayer1Symbol('O');
      setPlayer2Symbol('X');
    }

    setPlayerInfoEntered(true);

    if (turn === null) {
      setTurn('X');
    }
  };

  return (
    <div className="container">
      <h1>{playerInfoEntered ? (lastRoundWinner !== '' ? `Last Round winner: ${lastRoundWinner}` : "Who's gonna win?") : 'Choose your weapon'}</h1>
      {!playerInfoEntered && (
        <PlayerInfo onChange={handlePlayerInfoChange} />
      )}
      {playerInfoEntered && turn !== null && (
        <>
          <div>
            <span>{player1Name} ({player1Symbol})</span>
            <span> vs </span>
            <span>{player2Name} ({player2Symbol})</span>
          </div>
          <Board
            winningSquares={winningSquares}
            turn={turn}
            squares={squares}
            onClick={handleClick}
          />
          <ScoreBoard scoreO={score.O} scoreX={score.X} />
        </>
      )}
    </div>
  );
};

export default App;