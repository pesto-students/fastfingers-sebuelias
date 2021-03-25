export const secondsToMilliseconds = (seconds) => {
  return seconds * 1000;
};

const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 50;
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

export const formatTimeLeft = (time) => {
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

export const calculateCircleDasharray = (duration, remainingTime) => {
  return `${(
    calculateTimeFraction(duration, remainingTime) * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
};

const calculateTimeFraction = (duration, remainingTime) => {
  const fraction = remainingTime / duration;
  // return fraction - (1 / duration) * (1 - fraction);
  return fraction;
};

export const calculateRemainingPathColor = (duration, timeLeft) => {
  const { alert, warning, info } = COLOR_CODES;

  const timeLeftPercent = (timeLeft / duration) * 100;

  if (timeLeftPercent <= alert.threshold) {
    return alert.color;
  } else if (timeLeftPercent <= warning.threshold) {
    return warning.color;
  }
  return info.color;
};
