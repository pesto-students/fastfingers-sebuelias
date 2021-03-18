import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Timer.css';
import { sessionStorageKeys } from '../../util';

const FULL_DASH_ARRAY = 283;
// Warning occurs at 50%
const WARNING_THRESHOLD = 50;
// Alert occurs at 25%
const ALERT_THRESHOLD = 25;

const COLOR_CODES = {
  info: {
    color: 'green',
  },
  warning: {
    color: 'orange',
    threshold: WARNING_THRESHOLD,
  },
  alert: {
    color: 'red',
    threshold: ALERT_THRESHOLD,
  },
};

const formatTimeLeft = (time) => {
  let seconds = Math.floor(time / 1000);
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  let milliseconds = Math.round((time % 1000) / 10);
  if (milliseconds < 10) {
    milliseconds = `0${milliseconds}`;
  }

  return `${seconds}:${milliseconds}`;
};

// Update the dasharray value as time passes, starting with 283
function calculateCircleDasharray(duration, remainingTime) {
  return `${(
    calculateTimeFraction(duration, remainingTime) * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
}

function calculateTimeFraction(duration, remainingTime) {
  const fraction = remainingTime / duration;
  return fraction - (1 / duration) * (1 - fraction);
  // return fraction;
}

function calculateRemainingPathColor(duration, timeLeft) {
  const { alert, warning, info } = COLOR_CODES;

  const timeLeftPercent = (timeLeft / duration) * 100;

  if (timeLeftPercent <= alert.threshold) {
    return alert.color;
  } else if (timeLeftPercent <= warning.threshold) {
    return warning.color;
  }
  return info.color;
}

export default function Timer({ duration, difficultyFactor, onTimeOut }) {
  const currentScore =
    sessionStorage.getItem(sessionStorageKeys.CURRENT_SCORE) ?? 0;
  const timeinMillisec = duration * 1000;

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

  // ! Questionable score logic, need to check
  const updateScore = () => {
    const timeTakenForWord = Math.floor(timeinMillisec - remainingTime);
    const timeTakenInSeconds = Number((timeTakenForWord / 1000).toFixed(2));
    const newScore = (Number(currentScore) + timeTakenInSeconds).toFixed(2);
    return newScore;
  };

  useEffect(() => {
    sessionStorage.setItem(sessionStorageKeys.CURRENT_SCORE, updateScore());
    setCircleDasharray(calculateCircleDasharray(timeinMillisec, remainingTime));

    setRemainingTime(duration * 1000);
    clearInterval(timerInterval);
    startTimer();
  }, [difficultyFactor]);

  useEffect(() => {
    setCircleDasharray(calculateCircleDasharray(timeinMillisec, remainingTime));
    setRemainingPathColor(
      calculateRemainingPathColor(timeinMillisec, remainingTime),
    );

    if (remainingTime <= 0) {
      sessionStorage.setItem(sessionStorageKeys.CURRENT_SCORE, updateScore());
      clearInterval(timerInterval);
      setRemainingTime(0);
      onTimeOut();
    }
  }, [remainingTime]);

  useEffect(() => {
    startTimer();

    if (remainingTime <= 0) {
      clearInterval(timerInterval);
      setRemainingTime(0);
    }

    return () => {
      clearInterval(timerInterval);
      setRemainingTime(0);
    };
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
