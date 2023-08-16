import React from 'react';
import './ScoreBoard.css';

const ScoreBoard = ({ scoreO, scoreX, playerOName, playerXName }) => {
  return (
    <div className="score-board">
      <div>
        {playerOName}: {scoreO}
      </div>
      <div>
        {playerXName}: {scoreX}
      </div>
    </div>
  );
};

export default ScoreBoard;