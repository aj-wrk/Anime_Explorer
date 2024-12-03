import React, { useState, useEffect } from 'react';
import GenreButtons from '../components/GenreButtons';
import AnimeCard from '../components/AnimeCard';

const genres = {
  Action: 1,
  Drama: 8,
  SciFi: 24,
  Fantasy: 10,
  Comedy: 4,
};

const Home = ({ animeList, loading, onAnimeClick }) => {
  const [displayedAnime, setDisplayedAnime] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    // Filter by genre and then apply search
    let filtered = animeList;

    if (selectedGenre) {
      const genreId = genres[selectedGenre];
      filtered = filtered.filter((anime) =>
        anime.genres.some((genre) => genre.mal_id === genreId)
      );
    }

    if (search) {
      filtered = filtered.filter((anime) =>
        anime.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    setDisplayedAnime(filtered);
  }, [selectedGenre, search, animeList]);

  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  return (
    <div className="home">
      <GenreButtons
        genres={Object.keys(genres)}
        setSelectedGenre={setSelectedGenre}
        selectedGenre={selectedGenre}
      />
      <input
        type="text"
        placeholder="Search for an anime..."
        value={search}
        onChange={handleSearch}
      />
      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="anime-list">
          {displayedAnime.map((anime) => (
            <AnimeCard key={anime.mal_id} anime={anime} onClick={onAnimeClick} />
          ))}
        </div>
      )}

    </div>
  );
};

export default Home;
