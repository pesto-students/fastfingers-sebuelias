import React, { useState, useEffect } from 'react';
import KeyboardIcon from '../../assets/keyboard.svg';
import PlayIcon from '../../assets/play.svg';
import './HomeScreen.css';
import GameScreen from '../GameScreen/GameScreen';
import {
  difficultyUtil,
  getNameOfCurrentUserScores,
  localStorageKeys,
} from '../../util';

const initlocalStorage = (userName, difficulty) => {
  localStorage.setItem(localStorageKeys.USERNAME, userName);
  localStorage.setItem(localStorageKeys.SELECTED_DIFFICULTY, difficulty);
  localStorage.setItem(getNameOfCurrentUserScores(userName), '');
};

export default function HomeScreen() {
  const [userName, setUserName] = useState('');
  const [difficulty, setDifficulty] = useState(difficultyUtil.EASY);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showUserNameRequired, setShowUserNameRequired] = useState(false);
  const [isSameUser, setIsSameUser] = useState(false);

  const userNameRef = React.createRef();

  let requiredCssClass = 'required';

  const onPlayClick = () => {
    if (userName) {
      localStorage.clear();
      initlocalStorage(userName, difficulty);
      setIsPlaying(true);
    } else {
      if (userNameRef.current) {
        userNameRef.current.focus();
        setShowUserNameRequired(true);
      }
    }
  };

  useEffect(() => {
    const lastUserName = localStorage.getItem(localStorageKeys.USERNAME);
    // const lastDifficulty = localStorage.getItem(
    //   localStorageKeys.SELECTED_DIFFICULTY,
    // );
    if (userNameRef.current) {
      userNameRef.current.focus();
    }
    if (lastUserName) {
      setUserName(lastUserName);
      // setDifficulty(lastDifficulty);
      setIsSameUser(true);
    }

    return () => {
      // localStorage.clear();
    };
  }, [userNameRef]);

  useEffect(() => {
    if (!isSameUser) {
      if (userNameRef.current) {
        userNameRef.current.focus();
      }
    }
  }, [isSameUser, userNameRef]);

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
        {!isSameUser ? (
          <div>
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
            {showUserNameRequired ? (
              <p className='name-req'>Name Required </p>
            ) : (
              <p className='name-req' />
            )}
          </div>
        ) : (
          <div className='welcome-back'>
            <p>Welcome back</p>
            <p className='username'>{userName.toUpperCase()}</p>
            <p
              className='change-user'
              onClick={() => {
                setIsSameUser(false);
                setUserName('');
                localStorage.clear();
              }}
            >
              Not you?
            </p>
          </div>
        )}
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
        <i class='fa fa-chevron-down'></i>
      </div>

      <button className='start-button button uppercase' onClick={onPlayClick}>
        <img className='button-image' src={PlayIcon} alt='Start Game Button' />
        START GAME
      </button>
    </div>
  );
}
