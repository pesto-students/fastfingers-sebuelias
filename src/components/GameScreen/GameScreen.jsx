import React, { useState, useEffect, useRef } from 'react';
import GameWord from '../GameWord/GameWord';
import EndScreen from '../EndScreen/EndScreen';
import GameHeader from '../GameHeader';
import Timer from '../Timer/Timer';
import GameScoreBoard from '../GameScoreBoard';
import Stop from '../../assets/stop.svg';
import './GameScreen.css';
import {
  getRandomWordForCurrentLevel,
  difficultyFactorUtil,
  getNameOfCurrentUserScores,
  calculateDuration,
  sessionStorageKeys,
  updateDifficultyWithDifficultyFactor,
} from '../../util';

const DIFFICULTY_INCREAMENT_FACTOR = 0.01;

export default function GameScreen() {
  const difficultySelected = sessionStorage.getItem(
    sessionStorageKeys.SELECTED_DIFFICULTY,
  );

  sessionStorage.setItem(sessionStorageKeys.DIFFICULTY, difficultySelected);
  const [difficulty, setDifficulty] = useState(difficultySelected);
  const difficultyFactor = useRef(difficultyFactorUtil[difficulty]);
  const userName = sessionStorage.getItem(sessionStorageKeys.USERNAME);
  let currentUserScores = sessionStorage.getItem(
    getNameOfCurrentUserScores(userName),
  );
  const gameInputRef = React.createRef();

  const [userInput, setUserInput] = useState('');
  const [randomWord, setRandomWord] = useState(
    getRandomWordForCurrentLevel(difficulty),
  );
  const [duration, setDuration] = useState(
    calculateDuration(randomWord, difficultyFactor.current),
  );
  const [isPlaying, setIsPlaying] = useState(true);

  const reInitialise = () => {
    sessionStorage.setItem(sessionStorageKeys.DIFFICULTY, difficultySelected);
    setDifficulty(difficultySelected);
    difficultyFactor.current = difficultyFactorUtil[difficulty];
    setUserInput('');
    setRandomWord(getRandomWordForCurrentLevel(difficulty));
    setDuration(calculateDuration(randomWord, difficultyFactor.current));
  };

  const updateDifficultyFactor = () => {
    difficultyFactor.current += DIFFICULTY_INCREAMENT_FACTOR;
    const revisedDifficulty = updateDifficultyWithDifficultyFactor(
      difficultyFactor.current,
    );
    if (revisedDifficulty !== difficulty) {
      setDifficulty(revisedDifficulty);
    }
    return revisedDifficulty;
  };

  const onInputCorrectWord = () => {
    const revisedDifficulty = updateDifficultyFactor();
    setRandomWord(getRandomWordForCurrentLevel(revisedDifficulty));
    setUserInput('');
    setDuration(calculateDuration(randomWord, difficultyFactor.current));
  };

  useEffect(() => {
    if (gameInputRef.current) {
      gameInputRef.current.focus();
    }
  });

  useEffect(() => {
    return () => {
      sessionStorage.removeItem(sessionStorageKeys.CURRENT_SCORE);
    };
  }, []);

  useEffect(() => {
    if (
      userInput.length > 0 &&
      userInput.toUpperCase() === randomWord.toUpperCase()
    ) {
      onInputCorrectWord();
    }
  }, [userInput]);

  const gameOver = () => {
    const currentScore =
      sessionStorage.getItem(sessionStorageKeys.CURRENT_SCORE) ?? 0;
    currentUserScores = `${currentUserScores} ${currentScore}`;
    sessionStorage.setItem(
      getNameOfCurrentUserScores(userName),
      currentUserScores,
    );

    setIsPlaying(false);
  };

  const playAgain = () => {
    reInitialise();
    setIsPlaying(true);
  };

  return !isPlaying ? (
    <EndScreen playAgain={playAgain} />
  ) : (
    <main className='game-container'>
      <GameHeader difficulty={difficulty} />

      <section className='game-body'>
        <aside className='game-sidebar'>
          <section className='game-scoreboard'>
            <GameScoreBoard />
          </section>
          <button className='stop-button button uppercase' onClick={gameOver}>
            <img
              className='start-button-image'
              src={Stop}
              alt='Start Game Button'
            />
            Stop Game
          </button>
        </aside>

        <div className='game-content'>
          <Timer
            duration={duration}
            difficultyFactor={difficultyFactor.current}
            onTimeOut={gameOver}
          />

          <div className='game-word'>
            <GameWord currentWord={randomWord} currentInput={userInput} />
          </div>

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
        </div>
      </section>
    </main>
  );
}
