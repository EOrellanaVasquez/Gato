import React from 'react';
import { useState } from 'react';
import './PlayerInfo.css';

const PlayerInfo = ({ onChange }) => {
    const [player1Name, setPlayer1Name] = useState('');
    const [player2Name, setPlayer2Name] = useState('');

    const handlePlayer1NameChange = (e) => {
      setPlayer1Name(e.target.value);
    };

    const handlePlayer2NameChange = (e) => {
      setPlayer2Name(e.target.value);
    };

    const handleSymbolChange = (symbol) => {
      onChange(player1Name, player2Name, symbol);
    };

    return (
        <div className="player-info">
          <div className="name-inputs">
            <input type="text" value={player1Name} onChange={handlePlayer1NameChange} placeholder='Player 1'/>
      
            <input type="text" value={player2Name} onChange={handlePlayer2NameChange} placeholder='Player 2'/>
          </div>
      
          <div className="symbol-selection">
            <button onClick={() => handleSymbolChange('X')}>X</button>
            <button onClick={() => handleSymbolChange('O')}>O</button>
          </div>
        </div>
      );
  };

  export default PlayerInfo;
