import React, { useState, useEffect } from 'react';
import Timer from '../Timer/Timer';
import GamePad from '../../assets/gamepad.svg';
import UserIcons from '../../assets/user.svg';
import Stop from '../../assets/stop.svg';
import './GameScreen.css';
export default function GameScreen() {
  const [userInput, setUserInput] = useState('');

  const userName = sessionStorage.getItem('userName');
  const difficulty = sessionStorage.getItem('difficulty');
  const gameInputRef = React.createRef();

  return (
    <div className='game-container'>
      <aside className='game-sidebar'>
        <section className='game-info'>
          <div className='game-info-card'>
            <img
              className='stop-button-image'
              src={UserIcons}
              alt='Start Game Button'
            />
            <span className='game-info-text uppercase'>{userName}</span>
          </div>
          <div className='game-info-card'>
            <img
              className='stop-button-image'
              src={GamePad}
              alt='Start Game Button'
            />
            <span className='game-info-text uppercase'>{`Level: ${difficulty} `}</span>
          </div>
        </section>

        <section className='game-scoreboard'></section>

        <button className='start-button button uppercase' onClick={() => {}}>
          <img
            className='start-button-image'
            src={Stop}
            alt='Start Game Button'
          />
          Stop Game
        </button>
      </aside>

      <section className='game-content'>
        <section className='game-main'>
          <div className='game-timer'>
            <Timer />
          </div>
          <div className='game-word'></div>
          <input
            className='game-input user-input user-input-text'
            type='text'
            value={userInput}
            onChange={(event) => {
              setUserInput(event.target.value);
            }}
            ref={gameInputRef}
            required
          />
        </section>
      </section>

      <section className='game-current-score'>
        <h3>fast fingers</h3>
        <h3>SCORE:</h3>
      </section>
    </div>
  );
}
