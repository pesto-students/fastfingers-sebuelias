import React, { useState, useEffect } from 'react';
import KeyboardIcon from '../../assets/keyboard.svg';
import PlayIcon from '../../assets/play.svg';
import './HomeScreen.css';
import GameScreen from '../GameScreen/GameScreen';
import {
  difficultyUtil,
  getNameOfCurrentUserScores,
  sessionStorageKeys,
} from '../../util';

const initSessionStorage = (userName, difficulty) => {
  sessionStorage.setItem(sessionStorageKeys.USERNAME, userName);
  sessionStorage.setItem(sessionStorageKeys.SELECTED_DIFFICULTY, difficulty);
  sessionStorage.setItem(getNameOfCurrentUserScores(userName), '');
};

export default function HomeScreen() {
  const [userName, setUserName] = useState('');
  const [difficulty, setDifficulty] = useState(difficultyUtil.EASY);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showUserNameRequired, setShowUserNameRequired] = useState(false);

  const userNameRef = React.createRef();

  let requiredCssClass = 'required';

  const onPlayClick = () => {
    if (userName) {
      sessionStorage.clear();
      initSessionStorage(userName, difficulty);
      setIsPlaying(true);
    } else {
      userNameRef.current.focus();
      setShowUserNameRequired(true);
    }
  };

  useEffect(() => {
    if (userNameRef.current) {
      userNameRef.current.focus();
    }
  }, [userNameRef]);

  return isPlaying ? (
    <GameScreen />
  ) : (
    <div className='home-screen-elements'>
      <div className='home-screen-heading'>
        <div className='keyboard-image'>
          <img src={KeyboardIcon} alt='keyboard'></img>
        </div>
        <h1 className='home-screen-title'>fast fingers</h1>
        <p className='home-screen-description'>the ultimate typing game</p>
      </div>

      <div className='home-screen-user-info'>
        {showUserNameRequired ? <span>Name Required </span> : <br />}
        <input
          type='text'
          className={`user-input user-input-text uppercase ${
            showUserNameRequired ? requiredCssClass : ''
          }`}
          value={userName}
          placeholder={'type your name'}
          onChange={(event) => {
            setShowUserNameRequired(false);
            setUserName(event.target.value);
          }}
          ref={userNameRef}
          required
        />

        <select
          className='user-input game-difficulty uppercase'
          value={difficulty}
          onChange={(event) => {
            let value = Array.from(
              event.target.selectedOptions,
              (option) => option.value,
            );
            setDifficulty(value);
          }}
        >
          <option value={difficultyUtil.EASY}>{difficultyUtil.EASY}</option>
          <option value={difficultyUtil.MEDIUM}>{difficultyUtil.MEDIUM}</option>
          <option value={difficultyUtil.HARD}>{difficultyUtil.HARD}</option>
        </select>
      </div>

      <button className='start-button button uppercase' onClick={onPlayClick}>
        <img className='button-image' src={PlayIcon} alt='Start Game Button' />
        START GAME
      </button>
    </div>
  );
}
