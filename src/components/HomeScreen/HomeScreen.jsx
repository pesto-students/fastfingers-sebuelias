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
  const [userNamePlaceHolder, setUserNamePlaceHolder] = useState(
    'type your name',
  );

  const userNameRef = React.createRef();

  let requiredCssClass = null;
  if (userNamePlaceHolder === 'type your name') {
    requiredCssClass = '';
  } else {
    requiredCssClass = 'required';
  }

  const onPlayClick = () => {
    if (userName) {
      initSessionStorage(userName, difficulty);
      setIsPlaying(true);
    } else {
      setUserNamePlaceHolder('name required');
      userNameRef.current.focus();
    }
  };

  useEffect(() => {
    sessionStorage.clear();
    if (userNameRef.current) {
      userNameRef.current.focus();
    }
  }, []);

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
        <input
          type='text'
          className={`user-input user-input-text uppercase ${requiredCssClass}`}
          value={userName}
          placeholder={userNamePlaceHolder}
          onChange={(event) => {
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
