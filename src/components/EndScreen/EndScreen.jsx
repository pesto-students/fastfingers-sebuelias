import React, { useState } from 'react';
import PropTypes from 'prop-types';
import GameHeader from '../GameHeader';
import HomeScreen from '../HomeScreen/HomeScreen';
import playAgainIcon from '../../assets/replay.svg';
import './EndScreen.css';
import { sessionStorageKeys, getHighScore } from '../../util';

export default function EndScreen({ playAgain }) {
  const highestScore = getHighScore();

  const [isNewGame, setIsNewGame] = useState(false);

  const currentScore = Number(
    sessionStorage.getItem(sessionStorageKeys.CURRENT_SCORE),
  );

  const quitGame = () => {
    sessionStorage.clear();
    setIsNewGame(true);
  };

  const showHighScore =
    currentScore === highestScore ? (
      <div className='high-score'>NEW HIGH SCORE</div>
    ) : null;

  return isNewGame ? (
    <HomeScreen />
  ) : (
    <div className='game-container'>
      <GameHeader
        difficulty={sessionStorage.getItem(sessionStorageKeys.DIFFICULTY)}
        isGameOver={true}
      />

      <div className='final-score-container'>
        <div className='score-header'>{`SCORE : GAME xx`}</div>
        <div className='final-score'>{currentScore}</div>
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
