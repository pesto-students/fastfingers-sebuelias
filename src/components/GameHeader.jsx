import React, { useEffect } from 'react';
import GamePad from '../assets/gamepad.svg';
import UserIcons from '../assets/user.svg';
import './Styles.css';
import { sessionStorageKeys } from '../util';
import PropTypes from 'prop-types';

export default function GameHeader({ difficulty, isGameOver }) {
  const userName = sessionStorage.getItem(sessionStorageKeys.USERNAME);
  const currentScore =
    sessionStorage.getItem(sessionStorageKeys.CURRENT_SCORE) ?? 0;

  useEffect(() => {
    return () => {
      sessionStorage.removeItem(sessionStorageKeys.CURRENT_SCORE);
    };
  }, []);

  return (
    <header className='game-info'>
      <div className='game-cards'>
        <div className='game-info-card'>
          <img
            className='stop-button-image'
            src={UserIcons}
            alt={`Player name ${userName}`}
          />
          <span className='game-info-text uppercase'>{userName}</span>
        </div>

        <div className='game-info-card'>
          <img
            className='stop-button-image'
            src={GamePad}
            alt={`Difficulty level ${difficulty}`}
          />
          <span className='game-info-text uppercase'>{`Level: ${difficulty}`}</span>
        </div>
      </div>

      <div className='game-current-score'>
        <div>fast fingers</div>
        {isGameOver ? null : <div>SCORE: {currentScore}</div>}
      </div>
    </header>
  );
}

GameHeader.propTypes = {
  difficulty: PropTypes.string.isRequired,
  isGameOver: PropTypes.bool,
};

GameHeader.defaultProps = {
  isGameOver: false,
};
