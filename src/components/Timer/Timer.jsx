import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Timer.css';
import { sessionStorageKeys, difficultyUtil } from '../../util';
import {
  secondsToMilliseconds,
  calculateCircleDasharray,
  calculateRemainingPathColor,
  formatTimeLeft,
} from './TimerUtil';

export default function Timer({ duration, difficultyFactor, onTimeOut }) {
  const currentScore =
    sessionStorage.getItem(sessionStorageKeys.CURRENT_SCORE) ?? 0;
  const timeinMillisec = secondsToMilliseconds(duration);

  const [remainingTime, setRemainingTime] = useState(timeinMillisec);
  const [circleDasharray, setCircleDasharray] = useState(
    calculateCircleDasharray(timeinMillisec, remainingTime),
  );

  const [remainingPathColor, setRemainingPathColor] = useState(
    calculateRemainingPathColor(timeinMillisec, remainingTime),
  );

  let timerInterval = null;

  const startTimer = () => {
    timerInterval = setInterval(() => {
      if (remainingTime > 0) {
        setRemainingTime((prevRemainingTime) => prevRemainingTime - 2);
      }
    }, 1);
  };

  // !Questionable score logic, need to check
  const updateScore = () => {
    const timeTakenForWord = Math.floor(timeinMillisec - remainingTime);
    const timeTakenInSeconds = Number((timeTakenForWord / 1000).toFixed(2));
    const newScore = (Number(currentScore) + timeTakenInSeconds).toFixed(2);
    return newScore;
  };

  const setNewTimeAndResetTimer = (newTime) => {
    setRemainingTime(secondsToMilliseconds(newTime));
    clearInterval(timerInterval);
  };

  useEffect(() => {
    sessionStorage.setItem(sessionStorageKeys.CURRENT_SCORE, updateScore());
    setCircleDasharray(calculateCircleDasharray(timeinMillisec, remainingTime));
    setNewTimeAndResetTimer(duration);
    startTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [difficultyFactor]);

  useEffect(() => {
    setCircleDasharray(calculateCircleDasharray(timeinMillisec, remainingTime));
    setRemainingPathColor(
      calculateRemainingPathColor(timeinMillisec, remainingTime),
    );

    if (remainingTime <= 0) {
      sessionStorage.setItem(sessionStorageKeys.CURRENT_SCORE, updateScore());
      setNewTimeAndResetTimer(0);
      onTimeOut();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remainingTime]);

  useEffect(() => {
    if (remainingTime <= 0) {
      setNewTimeAndResetTimer(0);
    } else {
      startTimer();
    }
    return () => {
      setNewTimeAndResetTimer(0);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='base-timer'>
      <svg
        className='base-timer__svg'
        viewBox='0 0 100 100'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g className='base-timer__circle'>
          <circle className='base-timer__path-elapsed' cx='50' cy='50' r='45' />
          <path
            id='base-timer-path-remaining'
            strokeDasharray={circleDasharray}
            className={`base-timer__path-remaining ${remainingPathColor}`}
            d='
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        '
          ></path>
        </g>
      </svg>
      <span id='base-timer-label' className='base-timer__label'>
        {formatTimeLeft(remainingTime)}
      </span>
    </div>
  );
}

Timer.propTypes = {
  difficultyFactor: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  onTimeOut: PropTypes.func,
};

Timer.defaultProps = {
  difficultyFactor: difficultyUtil.EASY,
  duration: secondsToMilliseconds(2),
  onTimeOut: () => {},
};
