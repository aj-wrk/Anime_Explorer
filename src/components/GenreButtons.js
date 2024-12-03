import React from 'react';


const GenreButtons = ({ genres, setSelectedGenre, selectedGenre }) => {
  return (
    <div className="filters">
      {genres.map((genre) => (
        <button
          key={genre}
          onClick={() => setSelectedGenre(genre === selectedGenre ? null : genre)}
          className={selectedGenre === genre ? 'active' : ''}
        >
          {genre}
        </button>
      ))}
    </div>
  );
};

export default GenreButtons;
