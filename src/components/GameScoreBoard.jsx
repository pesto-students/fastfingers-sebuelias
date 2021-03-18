import React from 'react';
import {
  sessionStorageKeys,
  getNameOfCurrentUserScores,
  getHighScore,
} from '../util';

export default function GameScoreBoard() {
  const userName = sessionStorage.getItem(sessionStorageKeys.USERNAME);
  const currentUserScores = sessionStorage.getItem(
    getNameOfCurrentUserScores(userName),
  );

  const currentUserScoresArray = currentUserScores.trim().split(' ');

  const highestScore = getHighScore();
  console.log(highestScore);
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
