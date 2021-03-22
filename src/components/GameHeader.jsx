import React, { useEffect, useState } from 'react';
import GamePad from '../assets/gamepad.svg';
import UserIcons from '../assets/user.svg';
import './Styles.css';
import { sessionStorageKeys, difficultyUtil, formatScore } from '../util';
import PropTypes from 'prop-types';

export default function GameHeader({ difficulty, isGameOver }) {
  const userName = sessionStorage.getItem(sessionStorageKeys.USERNAME);
  const [currentScore, setCurrentScore] = useState(
    sessionStorage.getItem(sessionStorageKeys.CURRENT_SCORE) ?? 0,
  );

  let scoreTImer = null;
  const startScoreTimer = () => {
    scoreTImer = setInterval(
      () => setCurrentScore((prevScore) => prevScore + 1),
      1000,
    );
  };

  useEffect(() => {
    sessionStorage.setItem(
      sessionStorageKeys.CURRENT_SCORE,
      formatScore(currentScore),
    );
  }, [currentScore]);

  useEffect(() => {
    if (!isGameOver) {
      startScoreTimer();
    } else {
      // clearTimeout(scoreTImer);
    }

    return () => {
      clearTimeout(scoreTImer);
      sessionStorage.setItem(
        sessionStorageKeys.CURRENT_SCORE,
        formatScore(currentScore),
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        {isGameOver ? null : <div>SCORE: {formatScore(currentScore)}</div>}
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
  difficulty: difficultyUtil.EASY,
};
