import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import GameHeader from '../GameHeader';
import HomeScreen from '../HomeScreen/HomeScreen';
import playAgainIcon from '../../assets/replay.svg';
import './EndScreen.css';
import { localStorageKeys, getHighScore } from '../../util';

let restartTimer = null;
const RICK_ROLL_URL = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

export default function EndScreen({ playAgain }) {
  const highestScore = getHighScore();

  const [isNewGame, setIsNewGame] = useState(false);
  const [restartCountDown, setRestartCounter] = useState(5);
  const [currentScore] = useState(
    Number(localStorage.getItem(localStorageKeys.CURRENT_SCORE)),
  );

  const [countDownText, setCountDownText] = useState('Game will restart in ');
  useEffect(() => {
    restartTimer = setInterval(() => {
      setRestartCounter((counter) => (counter -= 1));
    }, 1000);
  }, []);

  useEffect(() => {
    if (restartCountDown === 0 && !isNewGame) {
      clearInterval(restartTimer);
      playAgain();
    }
  }, [restartCountDown, playAgain, isNewGame]);

  const quitGame = () => {
    const userName = localStorage.getItem(localStorageKeys.USERNAME);
    // const difficulty = localStorage.getItem(
    //   localStorageKeys.SELECTED_DIFFICULTY,
    // );
    localStorage.clear();
    localStorage.setItem(localStorageKeys.USERNAME, userName);
    // localStorage.setItem(localStorageKeys.SELECTED_DIFFICULTY, difficulty);
    setIsNewGame(true);
  };

  const showHighScore =
    currentScore === highestScore ? (
      <a
        className='high-score uppercase'
        onClick={() => {
          clearInterval(restartTimer);
          setCountDownText('');
          setRestartCounter(null);
        }}
        href={RICK_ROLL_URL}
        rel='noopener noreferrer'
        target='_blank'
      >
        NEW HIGH SCORE
      </a>
    ) : null;

  return isNewGame ? (
    <HomeScreen />
  ) : (
    <div className='game-container'>
      <GameHeader
        difficulty={localStorage.getItem(localStorageKeys.DIFFICULTY)}
        isGameOver={true}
      />

      <div className='final-score-container'>
        <div className='score-header uppercase'>{`SCORE : `}</div>
        <div className='final-score uppercase'>{currentScore}</div>
        {showHighScore}
      </div>

      <button className='end-game-buttons button uppercase' onClick={playAgain}>
        <img
          className='button-image'
          src={playAgainIcon}
          alt='Play Again Button'
        />
        PLAY AGAIN
      </button>
      <p className='score-header uppercase'>
        {countDownText}{' '}
        <span>{restartCountDown > 0 ? restartCountDown : null}</span>
      </p>

      <div className='quit-game-container'>
        <button
          className='end-game-buttons button uppercase'
          onClick={quitGame}
        >
          QUIT
        </button>
      </div>
    </div>
  );
}

EndScreen.propTypes = {
  playAgain: PropTypes.func.isRequired,
};

EndScreen.defaultProps = {
  playAgain: () => {},
};
