import React, { useEffect, useState } from 'react';

const AnimeDetail = ({ anime, onBack }) => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`https://api.jikan.moe/v4/anime/${anime.mal_id}/characters`)
      .then((response) => response.json())
      .then((data) => {
        setCharacters(data.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [anime.mal_id]);

  return (
    <div className="anime-detail">
      <button onClick={onBack}>Back</button>
      <h1>{anime.title}</h1>
      <br></br>
      <p>
        <strong>Release Date:</strong> {anime.aired.string}
      </p>
      <br></br>
      <p>
        <strong>Synopsis</strong>
        <p>{anime.synopsis}</p>
      </p>
      <hr style={{ borderColor: '#555', margin: '20px 0' }} />
      <br></br>
      <h2>Characters</h2>
      {loading ? (
        <p>Loading characters...</p>
      ) : (
        <div className="character-grid">
          {characters.map((character) => (
            <div key={character.mal_id} className="character-card">
              <img
                src={character.character.images.jpg.image_url}
                alt={character.character.name}
              />
              <p>{character.character.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AnimeDetail;
