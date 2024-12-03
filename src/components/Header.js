import React from 'react';

const Header = ({ onHomeClick }) => {
  return (
    <header>
      <h1>Anime Explorer</h1>
      <button onClick={onHomeClick}>Home</button>
    </header>
  );
};

export default Header;