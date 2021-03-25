import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Timer.css';
import { difficultyUtil } from '../../util';
import {
  secondsToMilliseconds,
  calculateCircleDasharray,
  calculateRemainingPathColor,
  formatTimeLeft,
} from './TimerUtil';

let timerInterval = null;

export default function Timer({ duration, difficultyFactor, onTimeOut }) {
  const timeinMillisec = secondsToMilliseconds(duration);
  const [remainingTime, setRemainingTime] = useState(timeinMillisec);
  const [circleDasharray, setCircleDasharray] = useState(
    calculateCircleDasharray(timeinMillisec, remainingTime),
  );

  const [remainingPathColor, setRemainingPathColor] = useState(
    calculateRemainingPathColor(timeinMillisec, remainingTime),
  );

  const startTimer = () => {
    timerInterval = setInterval(() => {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 10);
    }, 10);
  };

  const setNewTimeAndResetTimer = (newTime) => {
    clearInterval(timerInterval);
    setRemainingTime(secondsToMilliseconds(newTime));
  };

  useEffect(() => {
    return () => {
      setNewTimeAndResetTimer(0);
    };
  }, []);

  useEffect(() => {
    // setCircleDasharray(calculateCircleDasharray(timeinMillisec, remainingTime));
    setNewTimeAndResetTimer(duration);
    startTimer();
  }, [difficultyFactor, duration]);

  useEffect(() => {
    setCircleDasharray(calculateCircleDasharray(timeinMillisec, remainingTime));
    setRemainingPathColor(
      calculateRemainingPathColor(timeinMillisec, remainingTime),
    );

    if (remainingTime <= 0) {
      setNewTimeAndResetTimer(0);
      onTimeOut();
    }
  }, [remainingTime, onTimeOut, timeinMillisec]);

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
