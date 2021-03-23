import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  localStorageKeys,
  updateDifficultyWithDifficultyFactor,
} from '../../util';

const DIFFICULTY_INCREAMENT_FACTOR = 0.01;

export default function GameScreen() {
  const difficultySelected = localStorage.getItem(
    localStorageKeys.SELECTED_DIFFICULTY,
  );

  localStorage.setItem(localStorageKeys.DIFFICULTY, difficultySelected);
  const [difficulty, setDifficulty] = useState(difficultySelected);
  const difficultyFactor = useRef(difficultyFactorUtil[difficulty]);
  const userName = localStorage.getItem(localStorageKeys.USERNAME);
  let currentUserScores = localStorage.getItem(
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
    localStorage.setItem(localStorageKeys.DIFFICULTY, difficultySelected);
    localStorage.removeItem(localStorageKeys.CURRENT_SCORE);
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
  // eslint-disable-next-line
  const onInputCorrectWord = useCallback(() => {
    const revisedDifficulty = updateDifficultyFactor();
    const newWord = getRandomWordForCurrentLevel(revisedDifficulty);
    setRandomWord(newWord);
    setUserInput('');
    setDuration(calculateDuration(newWord, difficultyFactor.current));
  });

  useEffect(() => {
    if (gameInputRef.current) {
      gameInputRef.current.focus();
    }
  });

  useEffect(() => {
    return () => {
      localStorage.removeItem(localStorageKeys.CURRENT_SCORE);
    };
  }, []);

  useEffect(() => {
    if (
      userInput.length > 0 &&
      userInput.toUpperCase() === randomWord.toUpperCase()
    ) {
      onInputCorrectWord();
    }
  }, [userInput, randomWord, onInputCorrectWord]);

  const gameOver = () => {
    const currentScore =
      localStorage.getItem(localStorageKeys.CURRENT_SCORE) ?? 0;
    currentUserScores = `${currentUserScores} ${currentScore}`;

    let tokens = currentUserScores.split(' ');
    if (tokens.length > 10) {
      let lengthToCut = tokens.length - 10;
      tokens = tokens.slice(lengthToCut);
    }
    let result = tokens.join(' ');

    localStorage.setItem(getNameOfCurrentUserScores(userName), result);

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

        {!isPlaying ? null : (
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
                setUserInput(event.target.value.toUpperCase());
              }}
              ref={gameInputRef}
              required
            />
          </div>
        )}
      </section>
    </main>
  );
}
