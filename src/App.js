import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import AnimeDetail from './pages/AnimeDetail';
import Header from './components/Header';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedAnime, setSelectedAnime] = useState(null);
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigateToDetail = (anime) => {
    setSelectedAnime(anime);
    setCurrentPage('detail');
  };

  const navigateToHome = () => {
    setSelectedAnime(null);
    setCurrentPage('home');
  };

  // Fetch anime data if not already fetched
  useEffect(() => {
    if (animeList.length === 0) {
      const genres = {
        Action: 1,
        Drama: 8,
        SciFi: 24,
        Fantasy: 10,
        Comedy: 4,
      };

      const removeDuplicates = (animeArray) => {
        const uniqueAnime = new Map();
        animeArray.forEach((anime) => {
          uniqueAnime.set(anime.mal_id, anime);
        });
        return Array.from(uniqueAnime.values());
      };

      const fetchAnime = async () => {
        setLoading(true);

        const batch1 = [genres.Action, genres.Drama];
        const batch2 = [genres.SciFi, genres.Fantasy];
        const batch3 = [genres.Comedy];

        const fetchBatch = async (batch) => {
          const promises = batch.map((genreId) =>
            fetch(`https://api.jikan.moe/v4/anime?genres=${genreId}`).then((res) =>
              res.json()
            )
          );
          const results = await Promise.all(promises);
          return results.flatMap((result) => result.data || []);
        };

        try {
          const animeBatch1 = await fetchBatch(batch1);
          setAnimeList((prev) => removeDuplicates([...prev, ...animeBatch1]));

          setTimeout(async () => {
            const animeBatch2 = await fetchBatch(batch2);
            setAnimeList((prev) => removeDuplicates([...prev, ...animeBatch2]));

            setTimeout(async () => {
              const animeBatch3 = await fetchBatch(batch3);
              setAnimeList((prev) => removeDuplicates([...prev, ...animeBatch3]));
              setLoading(false);
            }, 1500); // Delay for batch 3
          }, 1500); // Delay for batch 2
        } catch (error) {
          console.error('Error fetching anime:', error);
          setLoading(false);
        }
      };

      fetchAnime();
    }
  }, [animeList]);

  return (
    <div>
      <div>
        <Header onHomeClick={navigateToHome} />
      </div>
      {currentPage === 'home' && (
        <Home
          animeList={animeList}
          loading={loading}
          onAnimeClick={navigateToDetail}
        />
      )}
      {currentPage === 'detail' && selectedAnime && (
        <AnimeDetail anime={selectedAnime} onBack={navigateToHome} />
      )}
    </div>
  );
};

export default App;
