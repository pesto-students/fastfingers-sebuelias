import React from 'react';
import PropTypes from 'prop-types';
import './GameWord.css';

const RIGHT_CHAR = 'right-char';
const WRONG_CHAR = 'wrong-char';
const WHITE_CHAR = 'white-char';

const setCharColor = (currentCharacter, currentIndex, currentInput) => {
  if (currentInput.length === 0 || currentInput.length - 1 < currentIndex) {
    return WHITE_CHAR;
  }

  if (
    currentCharacter.toUpperCase() === currentInput[currentIndex].toUpperCase()
  ) {
    return RIGHT_CHAR;
  }

  if (
    currentCharacter.toUpperCase() !== currentInput[currentIndex].toUpperCase()
  ) {
    return WRONG_CHAR;
  }
};

export default function GameWord({ currentWord, currentInput }) {
  const wordCharacterArray = [...currentWord];

  if (!currentWord) {
    return <div></div>;
  }

  const content = wordCharacterArray.map((currentCharacter, currentIndex) => (
    <span
      key={currentIndex}
      className={`uppercase game-char ${setCharColor(
        currentCharacter,
        currentIndex,
        currentInput,
      )}`}
    >
      {currentCharacter}
    </span>
  ));

  return <div>{content}</div>;
}

GameWord.propTypes = {
  currentWord: PropTypes.string.isRequired,
  currentInput: PropTypes.string.isRequired,
};
