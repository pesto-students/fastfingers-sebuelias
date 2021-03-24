import React from 'react';
import {
  localStorageKeys,
  getNameOfCurrentUserScores,
  getHighScore,
} from '../util';

export default function GameScoreBoard() {
  const userName = localStorage.getItem(localStorageKeys.USERNAME);
  const currentUserScores = localStorage.getItem(
    getNameOfCurrentUserScores(userName),
  );

  const currentUserScoresArray = currentUserScores
    ? currentUserScores.trim().split(' ')
    : null;

  const highestScore = getHighScore();
  const scoreBoardContent = currentUserScores ? (
    <ul className='score-list'>
      {currentUserScoresArray.map((score, index) => (
        <li
          key={index}
          className={`score ${
            highestScore === Number(score) ? 'highest-score' : ''
          }`}
        >
          {`Game ${index + 1} : ${score}`}
        </li>
      ))}
    </ul>
  ) : null;

  return (
    <div className='scoreboard-container'>
      <p>SCORE BOARD</p>
      {scoreBoardContent}
    </div>
  );
}
