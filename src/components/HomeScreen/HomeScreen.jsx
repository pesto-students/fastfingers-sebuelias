import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import KeyboardIcon from '../../assets/keyboard.svg';
import PlayIcon from '../../assets/play.svg';
import './HomeScreen.css';
import GameScreen from '../GameScreen/GameScreen';

export default function HomeScreen() {
  return <GameScreen />;

  /*
  const [userName, setUserName] = useState('');
  const [difficulty, setDifficulty] = useState('easy');
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
      setIsPlaying(true);
    } else {
      setUserNamePlaceHolder('name required');
      userNameRef.current.focus();
    }
  };

  useEffect(() => {
    // if (userNameRef.current) {
    userNameRef.current.focus();
    // }
  }, []);

  useEffect(() => {
    sessionStorage.setItem('userName', userName);
  }, [userName]);

  useEffect(() => {
    sessionStorage.setItem('difficulty', difficulty);
  }, [difficulty]);

  if (isPlaying) {
    return <GameScreen />;
  }

  return (
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
            setDifficulty(event.target.value);
          }}
        >
          <option value='easy'>Easy</option>
          <option value='medium'>Medium</option>
          <option value='hard'>Hard</option>
        </select>
      </div>

      <button className='start-button button uppercase' onClick={onPlayClick}>
        <img
          className='start-button-image'
          src={PlayIcon}
          alt='Start Game Button'
        />
        START GAME
      </button>
    </div>
  ); */
}
