import DictionaryFile from './assets/data/dictionary.json';

export const difficultyUtil = {
  EASY: 'EASY',
  MEDIUM: 'MEDIUM',
  HARD: 'HARD',
};

export const difficultyFactorUtil = {
  [difficultyUtil.EASY]: 1,
  [difficultyUtil.MEDIUM]: 1.5,
  [difficultyUtil.HARD]: 2,
};

export const localStorageKeys = {
  USERNAME: 'username',
  DIFFICULTY: 'difficulty',
  SELECTED_DIFFICULTY: 'selected_difficulty',
  CURRENT_SCORE: 'currentScore',
  SCORES: 'Scores',
};

export const updateDifficultyWithDifficultyFactor = (difficultyFactor) => {
  let calculatedDifficulty = null;
  if (difficultyFactor < difficultyFactorUtil.MEDIUM) {
    calculatedDifficulty = difficultyUtil.EASY;
  } else if (difficultyFactor < difficultyFactorUtil.HARD) {
    calculatedDifficulty = difficultyUtil.MEDIUM;
  } else {
    calculatedDifficulty = difficultyUtil.HARD;
  }

  const currentDifficulty = localStorage.getItem(localStorageKeys.DIFFICULTY);

  if (calculatedDifficulty !== currentDifficulty) {
    localStorage.setItem(localStorageKeys.DIFFICULTY, calculatedDifficulty);
  }
  return calculatedDifficulty;
};

export const formatScore = (score) => {
  let minutes = parseInt(score / 60);
  let seconds = parseInt(score % 60);
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  const finalScore = `${minutes}.${seconds}`;
  return finalScore;
};

export const getHighScore = () => {
  const userName = localStorage.getItem(localStorageKeys.USERNAME);
  const scores = localStorage.getItem(getNameOfCurrentUserScores(userName));
  const scoresArray = scores ? scores.trim().split(' ') : [];
  if (scoresArray.length === 0) {
    return Number(0);
  }
  const highestScore = scoresArray.reduce((prev, current) => {
    return Math.max(Number(prev), Number(current));
  });
  return highestScore;
};

export const getNameOfCurrentUserScores = (userName) => {
  return `${userName}_${localStorageKeys.SCORES}`;
};

const MIN_DURATION = 2;
export const calculateDuration = (randomWord, difficultyFactor) => {
  let durationCalculated = Math.ceil(randomWord.length / difficultyFactor);

  if (durationCalculated < MIN_DURATION) {
    durationCalculated = MIN_DURATION;
  }
  console.log('calc duration');
  console.log(randomWord);
  console.log(difficultyFactor);
  console.log(durationCalculated);
  return durationCalculated;
};

const getRandomIndex = (arrayLength) => {
  return Math.floor(Math.random() * arrayLength);
};

const generateRandomWord = () => {
  const dictionary = DictionaryFile;
  const randomIndex = getRandomIndex(dictionary.length);
  return dictionary[randomIndex];
};

const checkWordMatchDifficulty = (randomWord, difficulty) => {
  let doWordMatchDifficulty = false;
  switch (difficulty) {
    case difficultyUtil.EASY:
      if (randomWord.length <= 4) {
        doWordMatchDifficulty = true;
      }
      break;

    case difficultyUtil.MEDIUM:
      if (randomWord.length <= 8 && randomWord.length >= 5) {
        doWordMatchDifficulty = true;
      }
      break;

    case difficultyUtil.HARD:
      if (randomWord.length > 8) {
        doWordMatchDifficulty = true;
      }
      break;

    default:
      throw new Error(
        'Difficulty Level Not Recogonized. Please check with the developer',
      );
  }
  return doWordMatchDifficulty;
};

export function getRandomWordForCurrentLevel(difficulty) {
  let randomWord = generateRandomWord();
  while (!checkWordMatchDifficulty(randomWord, difficulty)) {
    randomWord = generateRandomWord();
  }
  return randomWord;
}
